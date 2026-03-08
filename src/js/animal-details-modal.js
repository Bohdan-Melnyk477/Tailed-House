function escapeHtml(str = '') {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

let scrollY = 0;

function lockBodyScroll() {
  scrollY = window.scrollY;

  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.left = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
}

function unlockBodyScroll() {
  const savedScrollY = Math.abs(parseInt(document.body.style.top || '0', 10));

  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.left = '';
  document.body.style.width = '';
  document.body.style.overflow = '';

  window.scrollTo(0, savedScrollY);
}

export function openModal(p, modal, modalContent) {
  modalContent.innerHTML = `
    <button
      class="pets-modal__close"
      type="button"
      data-modal-close
      aria-label="Закрити"
    >
      ✕
    </button>

    <img
      class="modal-img"
      src="${escapeHtml(p.img)}"
      alt="${escapeHtml(p.name)}"
    />

    <div class="modal-header">
      <p class="modal-sub">${escapeHtml(p.species)}</p>
      <h3 class="modal-title" id="petModalTitle">${escapeHtml(p.name)}</h3>
      <div class="modal-meta">
        ${p.age ? `<span>${escapeHtml(p.age)}</span>` : ''}
        ${p.sex ? `<span>${escapeHtml(p.sex)}</span>` : ''}
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

    <button
      class="modal-btn"
      type="button"
      data-order="${escapeHtml(p.id)}"
    >
      Взяти додому
    </button>
  `;

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  lockBodyScroll();

  const closeBtn = modal.querySelector('[data-modal-close]');
  closeBtn?.focus();

  const orderBtn = modalContent.querySelector('[data-order]');
  orderBtn?.addEventListener('click', () => {
    closeModal(modal);

    if (window.openOrderModal) {
      window.openOrderModal(orderBtn.dataset.order);
    }
  });
}

export function closeModal(modal) {
  if (!modal) return;

  if (modal.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  unlockBodyScroll();
}