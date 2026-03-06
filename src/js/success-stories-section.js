import axios from 'axios';
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const storiesList = document.querySelector('#stories-list');

function getStars(rate) {
  return Array.from({ length: 5 }, (_, i) => {
    if (i < Math.floor(rate))
      return `<img src="./svg/star-filled.svg" width="20" height="19" alt="★">`;
    if (i < rate)
      return `<img src="./svg/star-half.svg" width="20" height="19" alt="½">`;
    return `<img src="./svg/star-outline.svg" width="20" height="19" alt="☆">`;
  }).join('');
}

async function getFeedback() {
  try {
    const response = await axios.get(
      'https://paw-hut.b.goit.study/api/feedbacks'
    );
    createMarkup(response.data.feedbacks);
  } catch (error) {
    console.log('Помилка при завантаженні відгуків:', error);
  }
}

function createMarkup(feedbacks) {
  const markup = feedbacks
    .map(
      item => `<div class="swiper-slide">
    <div class="feedback-card">
      <div class="stars">${getStars(item.rate)}</div>
      <p class="card-description">${item.description}</p>
      <h3 class="card-autor">${item.author}</h3>
    </div>
  </div>`
    )
    .join('');
  storiesList.insertAdjacentHTML('beforeend', markup);
  initSwiper();
}

function initSwiper() {
  const swiper = new Swiper('.feedbacks-slider', {
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

getFeedback();
