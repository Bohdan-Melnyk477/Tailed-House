import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const storiesList = document.querySelector('#stories-list');
const storiesLoader = document.querySelector('#stories-loader');
const swiperControls = document.querySelector('.swiper-controls');

let swiperInstance = null;

function showStoriesLoader() {
  storiesLoader?.classList.add('is-visible');
  storiesLoader?.setAttribute('aria-hidden', 'false');
  swiperControls?.classList.add('is-hidden');
}

function hideStoriesLoader() {
  storiesLoader?.classList.remove('is-visible');
  storiesLoader?.setAttribute('aria-hidden', 'true');
  swiperControls?.classList.remove('is-hidden');
}

function getStars(rate) {
  return Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rate)) {
      return `<img src="./svg/star-filled.svg" width="20" height="19" alt="★">`;
    }

    if (i < rate) {
      return `<img src="./svg/star-half.svg" width="20" height="19" alt="½">`;
    }

    return `<img src="./svg/star-outline.svg" width="20" height="19" alt="☆">`;
  }).join('');
}

function renderFallback() {
  if (!storiesList) return;

  storiesList.innerHTML = `
    <div class="swiper-slide">
      <div class="feedback-card feedback-card--fallback">
        <p class="card-description">
          Відгуки тимчасово недоступні. Спробуйте ще раз пізніше.
        </p>
      </div>
    </div>
  `;
}

function createMarkup(feedbacks) {
  if (!storiesList) return;

  const markup = feedbacks
    .map(
      item => `
        <div class="swiper-slide">
          <div class="feedback-card">
            <div class="stars">${getStars(item.rate)}</div>
            <p class="card-description">${item.description}</p>
            <h3 class="card-autor">${item.author}</h3>
          </div>
        </div>
      `
    )
    .join('');

  storiesList.innerHTML = markup;
}

function initSwiper() {
  if (!document.querySelector('.feedbacks-slider')) return;

  if (swiperInstance) {
    swiperInstance.destroy(true, true);
  }

  swiperInstance = new Swiper('.feedbacks-slider', {
    modules: [Pagination, Navigation],
    pagination: {
      el: '.swiper-pag',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },
    navigation: {
      nextEl: '.swiper-next-button',
      prevEl: '.swiper-prev-button',
      disabledClass: 'slider-button-disabled',
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
    },
  });
}

async function getFeedback() {
  if (!storiesList) return;

  showStoriesLoader();

  try {
    const response = await axios.get(
      'https://paw-hut.b.goit.study/api/feedbacks'
    );

    const feedbacks = response?.data?.feedbacks ?? [];

    createMarkup(feedbacks);
    initSwiper();
  } catch (error) {
    console.error('Помилка при завантаженні відгуків:', error);

    Swal.fire({
      icon: 'error',
      title: 'Не вдалося завантажити відгуки',
      text: 'Спробуйте ще раз пізніше.',
      confirmButtonText: 'OK',
    });

    renderFallback();
    initSwiper();
  } finally {
    hideStoriesLoader();
  }
}

getFeedback();