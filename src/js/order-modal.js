import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const BASE_URL = 'https://paw-hut.b.goit.study/api';

const refs = {
  modal: document.getElementById('orderModal'),
  dialog: document.querySelector('#orderModal .order-modal__dialog'),
  form: document.getElementById('orderForm'),
  animalId: document.getElementById('orderAnimalId'),
  submitBtn: document.querySelector('#orderForm button[type="submit"]'),
};

let lastFocusedEl = null;
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

function setError(name, msg) {
  if (!refs.form) return;
  const el = refs.form.querySelector(`[data-error-for="${name}"]`);
  if (el) el.textContent = msg || '';
}

function clearErrors() {
  if (!refs.form) return;
  refs.form
    .querySelectorAll('[data-error-for]')
    .forEach(el => {
      el.textContent = '';
    });
}

function setSubmitLoading(isLoading) {
  if (!refs.submitBtn) return;

  refs.submitBtn.disabled = isLoading;
  refs.submitBtn.textContent = isLoading ? 'Відправляємо...' : 'Відправити';
}

function validate(formData) {
  let ok = true;

  const name = (formData.get('name') || '').trim();
  const phone = (formData.get('phone') || '')
    .replace(/\D/g, '')
    .trim();

  setError('name', '');
  setError('phone', '');

  if (name.length < 2) {
    setError('name', "Вкажіть ім'я (мін. 2 символи).");
    ok = false;
  }

  if (!/^\d{12}$/.test(phone)) {
    setError('phone', 'Вкажіть номер у форматі 380XXXXXXXXX');
    ok = false;
  }

  if (!formData.get('animalId')) {
    ok = false;

    Swal.fire({
      icon: 'error',
      title: 'Помилка',
      text: 'Не знайдено id тваринки для заявки.',
      confirmButtonText: 'OK',
    });
  }

  return ok;
}

async function postOrder(payload) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let msg = 'Не вдалося надіслати заявку. Спробуйте ще раз.';

    try {
      const data = await res.json();
      msg = data?.message || msg;
    } catch (_) {
    }

    throw new Error(msg);
  }

  return await res.json();
}

export function openOrderModal(animalId) {
  if (!refs.modal || !refs.form || !refs.animalId) {
    console.error('Order modal DOM not found');
    return;
  }

  if (!animalId) {
    Swal.fire({
      icon: 'error',
      title: 'Помилка',
      text: 'Не знайдено id тваринки для заявки.',
      confirmButtonText: 'OK',
    });
    return;
  }

  lastFocusedEl = document.activeElement;

  refs.animalId.value = animalId;
  clearErrors();

  refs.modal.classList.add('is-open');
  refs.modal.setAttribute('aria-hidden', 'false');
  lockBodyScroll();

  refs.dialog?.focus();
}

export function closeOrderModal() {
  if (!refs.modal) return;

  refs.modal.classList.remove('is-open');
  refs.modal.setAttribute('aria-hidden', 'true');
  unlockBodyScroll();

  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
    lastFocusedEl.focus();
  }
}

if (refs.modal) {
  refs.modal.addEventListener('click', e => {
    if (e.target.closest('[data-modal-close]')) {
      closeOrderModal();
    }
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && refs.modal?.classList.contains('is-open')) {
    closeOrderModal();
  }
});

if (refs.form) {
  refs.form.addEventListener('submit', async e => {
    e.preventDefault();

    const formData = new FormData(refs.form);
    if (!validate(formData)) return;

    const payload = {
      name: (formData.get('name') || '').trim(),
      phone: (formData.get('phone') || '').replace(/\D/g, '').trim(),
      comment: (formData.get('comment') || '').trim(),
      animalId: formData.get('animalId'),
    };

    try {
      setSubmitLoading(true);

      await postOrder(payload);

      await Swal.fire({
        icon: 'success',
        title: 'Заявку надіслано!',
        text: "Ми скоро з вами зв'яжемося.",
        confirmButtonText: 'OK',
      });

      refs.form.reset();
      closeOrderModal();
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Не вдалося надіслати заявку',
        text:
          err?.message || 'Спробуйте ще раз трохи пізніше.',
        confirmButtonText: 'OK',
      });
    } finally {
      setSubmitLoading(false);
    }
  });
}

window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;