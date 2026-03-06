function escapeHtml(str = "") {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function openModal(p, modal, modalContent) {
  modalContent.innerHTML = `
    <img class="modal-img" src="${escapeHtml(p.img)}" alt="${escapeHtml(p.name)}" />

    <div class="modal-header">
      <p class="modal-sub">${escapeHtml(p.species)}</p>
      <h3 class="modal-title" id="petModalTitle">${escapeHtml(p.name)}</h3>
      <div class="modal-meta">
        ${p.age ? `<span>${escapeHtml(p.age)}</span>` : ""}
        ${p.sex ? `<span>${escapeHtml(p.sex)}</span>` : ""}
      </div>
    </div>

    <div class="modal-desc">
      <h4 class="modal-desc-title">Опис:</h4>
      <p class="modal-desc-text">${escapeHtml(p.description)}</p>

      <h4 class="modal-desc-title">Здоровʼя:</h4>
      <p class="modal-desc-text">${escapeHtml(p.healthStatus)}</p>

      <h4 class="modal-desc-title">Поведінка:</h4>
      <p class="modal-desc-text">${escapeHtml(p.behavior)}</p>
    </div>

    <button class="modal-btn" type="button">Взяти додому</button>
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

export function closeModal(modal) {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}