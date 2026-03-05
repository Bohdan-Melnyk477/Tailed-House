import axios from 'axios';
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Raty from 'raty-js';
import 'raty-js/src/raty.css';

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
      <div class="stars js-raty" data-score="${item.rate}"></div>
      <p class="card-description">${item.description}</p>
      <h3 class="card-autor">${item.author}</h3>
      </div>
    </div>`
    ).join('');
  storiesList.insertAdjacentHTML('beforeend', markup);
  initSwiper();

  const stars = document.querySelectorAll(".js-raty");
  stars.forEach(el => {
    try {
      const score = el.dataset.score;
      const raty = new Raty(el, {
      readOnly: true,
      score: score,
      halfShow: true,
      starOff: '../svg/star-outline.svg',
      starOn: '../svg/star-filled.svg',
      starHalf: '../svg/star-half.svg',
    });
    raty.init();
    } catch (error) {
      console.error("Raty error:", err);
    }
  });
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
        nextEl: ".swiper-next-button",
        prevEl: ".swiper-prev-button",
        disabledClass: "slider-button-disabled",
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
    },
  });
}
getFeedback();