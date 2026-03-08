import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const BASE_URL = 'https://paw-hut.b.goit.study/api';

const refs = {
  modal: document.getElementById('orderModal'),
  dialog: document.querySelector('#orderModal .order-modal__dialog'),
  form: document.getElementById('orderForm'),
  animalId: document.getElementById('orderAnimalId'),
};

let lastFocusedEl = null;

function openOrderModal(animalId) {
  if (!animalId) {
    Swal.fire({
      icon: 'error',
      title: 'Помилка',
      text: 'Не знайдено id тваринки для заявки.',
    });
    return;
  }

  lastFocusedEl = document.activeElement;

  

  refs.animalId.value = animalId;
  clearErrors();

  refs.modal.classList.add('is-open');
  refs.modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  refs.dialog?.focus();
}

function closeOrderModal() {
  refs.modal.classList.remove('is-open');
  refs.modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');

  if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
    lastFocusedEl.focus();
  }
}

refs.modal.addEventListener('click', e => {
  if (e.target.closest('[data-modal-close]')) closeOrderModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && refs.modal.classList.contains('is-open')) {
    closeOrderModal();
  }
});

function setError(name, msg) {
  const el = refs.form.querySelector(`[data-error-for="${name}"]`);
  if (el) el.textContent = msg || '';
}

function clearErrors() {
  refs.form
    .querySelectorAll('[data-error-for]')
    .forEach(el => (el.textContent = ''));
}

function validate(formData) {
  let ok = true;

  const name = (formData.get('name') || '').trim();
  const phone = (formData.get('phone') || '').trim().replace(/\s/g, '');

  setError('name', '');
  setError('phone', '');

  if (name.length < 2) {
    setError('name', 'Вкажіть ім’я (мін. 2 символи).');
    ok = false;
  }

  if (!/^\+?\d{8,15}$/.test(phone)) {
    setError('phone', 'Вкажіть коректний номер (8–15 цифр).');
    ok = false;
  }

  if (!formData.get('animalId')) {
    ok = false;
    Swal.fire({
      icon: 'error',
      title: 'Помилка',
      text: 'Не знайдено id тваринки для заявки.',
    });
  }

  return ok;
}

async function postOrder(payload) {
  console.log('ORDER PAYLOAD:', payload);

  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let msg = 'Помилка запиту.';
    try {
      const data = await res.json();
      console.log('ORDER ERROR RESPONSE:', data);
      msg = data?.message || msg;
    } catch (_) {}
    throw new Error(msg);
  }

  return await res.json();
}

refs.form.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(refs.form);
  if (!validate(formData)) return;

  const payload = {
    name: formData.get('name').trim(),
    phone: formData.get('phone').trim(),
    comment: (formData.get('comment') || '').trim(),
    animalId: formData.get('animalId'),
  };

  try {
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
      title: 'Помилка',
      text: err?.message || 'Щось пішло не так. Спробуйте ще раз трохи пізніше.',
    });
  }
});

window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;