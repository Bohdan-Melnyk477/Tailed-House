import { openModal, closeModal } from './animal-details-modal.js';

// ===================== API =====================
const API_ORIGIN = "https://paw-hut.b.goit.study";

const API = {
  categories: `${API_ORIGIN}/api/categories`,
  animals: `${API_ORIGIN}/api/animals`,
};

// ===================== DOM =====================
const els = {
  filters: document.getElementById("categoryFilters"),
  list: document.getElementById("petsList"),
  loadMore: document.getElementById("loadMoreBtn"),
  modal: document.getElementById("petModal"),
  modalContent: document.getElementById("petModalContent"),
  loader: document.getElementById("petsLoader"),
};

// ===================== STATE =====================
const state = {
  category: "all",
  apiPage: 1,
  limit: getLimitByScreen(),
  hasMoreApi: true,
  totalPages: null,
  cache: new Map(),
  isLoading: false,
};

// ===================== LOADER =====================
function showLoader() {
  if (!els.loader) return;
  els.loader.classList.add("is-visible");
  els.loader.setAttribute("aria-hidden", "false");
}

function hideLoader() {
  if (!els.loader) return;
  els.loader.classList.remove("is-visible");
  els.loader.setAttribute("aria-hidden", "true");
}

function setPetsLoadingState(isLoading) {
  if (!els.list) return;

  els.list.classList.toggle("is-loading", isLoading);

  const buttons = els.list.querySelectorAll("[data-more]");
  buttons.forEach(btn => {
    btn.disabled = isLoading;
  });
}

// ===================== HELPERS =====================
function getLimitByScreen() {
  return window.innerWidth >= 1024 ? 9 : 8;
}

function setActiveCategoryButton(category) {
  if (!els.filters) return;

  els.filters.querySelectorAll(".pets__filter-btn").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.category === category);
  });
}

function setLoadMoreVisible(visible) {
  if (!els.loadMore) return;
  els.loadMore.style.display = visible ? "inline-flex" : "none";
}

function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function fetchJSON(url) {
  const res = await fetch(url);
  const ct = res.headers.get("content-type") || "";

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} for ${url}\n${text.slice(0, 200)}`);
  }

  if (!ct.includes("application/json")) {
    const text = await res.text().catch(() => "");
    throw new Error(`Expected JSON but got "${ct}" for ${url}\n${text.slice(0, 80)}`);
  }

  return res.json();
}

function normalizeCategory(cat) {
  if (typeof cat === "string") return cat;
  return cat?.name ?? String(cat);
}

function normalizeAnimal(a) {
  return {
    id: String(a._id ?? a.id ?? ""),
    name: String(a.name ?? "—"),
    img: String(a.image ?? ""),
    species: String(a.species ?? ""),
    age: String(a.age ?? ""),
    sex: String(a.gender ?? ""),
    shortDescription: String(a.shortDescription ?? ""),
    description: String(a.description ?? ""),
    healthStatus: String(a.healthStatus ?? ""),
    behavior: String(a.behavior ?? ""),
    categories: Array.isArray(a.categories)
      ? a.categories.map(c => c?.name ?? "").filter(Boolean)
      : [],
    raw: a,
  };
}

function matchesCategory(pet, selected) {
  if (selected === "all") return true;

  const selectedLower = selected.toLowerCase();
  const catsLower = pet.categories.map(c => c.toLowerCase());

  if (catsLower.includes(selectedLower)) return true;

  const sp = (pet.species || "").toLowerCase();
  if (sp.includes(selectedLower)) return true;

  if (
    selectedLower.includes("гриз") &&
    (sp.includes("щур") || sp.includes("хом") || sp.includes("миш") || sp.includes("гриз"))
  ) {
    return true;
  }

  return false;
}

// ===================== RENDER =====================
function renderCategories(categories) {
  els.filters.innerHTML = "";

  const allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = "pets__filter-btn is-active";
  allBtn.dataset.category = "all";
  allBtn.textContent = "Всі";
  els.filters.appendChild(allBtn);

  categories
    .map(normalizeCategory)
    .filter(Boolean)
    .forEach(name => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pets__filter-btn";
      btn.dataset.category = name;
      btn.textContent = name;
      els.filters.appendChild(btn);
    });
}

function cardHTML(p) {
  const tagsHTML = p.categories.length
    ? `<ul class="pet-card__tags">${p.categories
        .slice(0, 6)
        .map(t => `<li class="tag">${escapeHtml(t)}</li>`)
        .join("")}</ul>`
    : "";

  return `
<li class="pet-card" data-id="${escapeHtml(p.id)}">
  <div class="pet-card__img-wrap">
    <img
      class="pet-card__img"
      src="${escapeHtml(p.img)}"
      alt="${escapeHtml(p.name)}"
      loading="lazy"
    >
  </div>

  <div class="pet-card__body">
    <p class="pet-card__species">${escapeHtml(p.species)}</p>
    <h3 class="pet-card__name">${escapeHtml(p.name)}</h3>

    ${tagsHTML}

    <div class="pet-card__meta">
      ${p.age ? `<span>${escapeHtml(p.age)}</span>` : ""}
      ${p.sex ? `<span>${escapeHtml(p.sex)}</span>` : ""}
    </div>

    <p class="pet-card__desc">${escapeHtml(p.shortDescription)}</p>

    <button class="pet-card__btn" type="button" data-more>
      Дізнатись більше
    </button>
  </div>
</li>`;
}

function renderPets(pets, { append = false } = {}) {
  const html = pets.map(cardHTML).join("");

  if (append) {
    els.list.insertAdjacentHTML("beforeend", html);
  } else {
    els.list.innerHTML = html;
  }
}

// ===================== DATA LOAD =====================
async function fetchAnimalsPage(page) {
  const url = new URL(API.animals);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(state.limit));

  const data = await fetchJSON(url.toString());
  const animals = (data.animals ?? []).map(normalizeAnimal);

  const totalItems = data.totalItems;

  if (typeof totalItems === "number") {
    state.totalPages = Math.ceil(totalItems / state.limit);
    state.hasMoreApi = page < state.totalPages;
  } else {
    state.hasMoreApi = animals.length >= state.limit;
  }

  animals.forEach(p => state.cache.set(p.id, p));
  return animals;
}

async function loadPortion({ reset = false, append = false } = {}) {
  if (state.isLoading) return;
  state.isLoading = true;

  if (els.loadMore) {
    els.loadMore.disabled = true;
  }

  showLoader();
  setPetsLoadingState(true);

  try {
    if (reset) {
      els.list.innerHTML = "";
      state.cache.clear();
      state.apiPage = 1;
      state.totalPages = null;
      state.hasMoreApi = true;
    }

    const collected = [];
    let safety = 0;

    while (collected.length < state.limit) {
      if (!state.hasMoreApi && state.apiPage > (state.totalPages ?? state.apiPage)) {
        break;
      }

      const animals = await fetchAnimalsPage(state.apiPage);
      const filtered = animals.filter(p => matchesCategory(p, state.category));
      collected.push(...filtered);

      if (state.hasMoreApi) {
        state.apiPage += 1;
      } else {
        break;
      }

      safety += 1;
      if (safety > 50) break;
    }

    renderPets(collected.slice(0, state.limit), { append });
    setPetsLoadingState(true);
    setLoadMoreVisible(state.hasMoreApi);
  } catch (err) {
    console.error(err);

    if (!append) {
      els.list.innerHTML =
        `<li style="padding:16px;color:#8b0000;">Помилка завантаження даних. Дивись console.</li>`;
    }

    setLoadMoreVisible(false);
  } finally {
    hideLoader();
    setPetsLoadingState(false);

    if (els.loadMore) {
      els.loadMore.disabled = false;
    }

    state.isLoading = false;
  }
}

// ===================== LOAD CATEGORIES =====================
async function loadCategories() {
  const data = await fetchJSON(API.categories);

  const categories = Array.isArray(data)
    ? data
    : data?.data ?? data?.categories ?? [];

  renderCategories(categories);
  setActiveCategoryButton("all");
}

// ===================== EVENTS =====================
els.filters.addEventListener("click", async e => {
  const btn = e.target.closest(".pets__filter-btn");
  if (!btn) return;

  const category = btn.dataset.category;
  if (category === state.category) return;

  state.category = category;
  setActiveCategoryButton(category);

  await loadPortion({ reset: true, append: false });
});

els.loadMore.addEventListener("click", async () => {
  await loadPortion({ reset: false, append: true });
});

els.list.addEventListener("click", e => {
  if (state.isLoading) return;

  const more = e.target.closest("[data-more]");
  if (!more) return;

  const card = e.target.closest(".pet-card");
  const id = card?.dataset?.id;
  if (!id) return;

  const pet = state.cache.get(id);
  if (pet) {
    openModal(pet, els.modal, els.modalContent);
  }
});

els.modal.addEventListener("click", e => {
  if (e.target.closest("[data-modal-close]")) {
    closeModal(els.modal);
  }
});

window.addEventListener("keydown", e => {
  if (e.key === "Escape" && els.modal.classList.contains("is-open")) {
    closeModal(els.modal);
  }
});

window.addEventListener("resize", () => {
  const newLimit = getLimitByScreen();

  if (newLimit !== state.limit) {
    state.limit = newLimit;
    loadPortion({ reset: true, append: false });
  }
});

// ===================== INIT =====================
(async function initPets() {
  if (!els.filters || !els.list || !els.loadMore || !els.modal || !els.modalContent || !els.loader) {
    console.error("Pets section DOM not found. Check ids in HTML.");
    return;
  }

  setLoadMoreVisible(false);

  await loadCategories();
  state.category = "all";
  state.apiPage = 1;

  await loadPortion({ reset: true, append: false });
})();