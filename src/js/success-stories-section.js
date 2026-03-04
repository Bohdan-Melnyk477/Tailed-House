import axios from 'axios';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const storiesList = document.querySelector('#stories-list');

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
      <div class="stars">${item.rate}</div>
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
    modules: [Pagination],
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
    },
  });
}
getFeedback();
