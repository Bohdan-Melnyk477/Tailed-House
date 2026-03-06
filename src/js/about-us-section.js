import Swiper from 'swiper';

import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const aboutUsSlides = [
  {
    id: 1,
    src: './img/about-1.jpg',
    
    srcset: './img/about-1.jpg 1x, ./img/about-1@2x.jpg 2x, ./img/about-1@3x.jpg 3x',
    alt: 'Authentic-looking, grainy black-and-white photo from around 2005. A young, caring woman is kneeling down on a city street and gently offering a piece of food to a cautious but hopeful-looking mixed-breed stray dog. The image has a vintage, documentary feel, with natural lighting and high contrast. The focus is on the emotional connection and the moment of first trust. Shot on 35mm film.',
    slideText:
      'Все почалося у 2015 році з кількох небайдужих людей та одного врятованого собаки. Сьогодні ми — один з найбільших притулків у регіоні, але наша мета незмінна: дати другий шанс тим, кого зрадили.',
  },
  {
    id: 2,
    src: './img/about-2.jpg',
    srcset: './img/about-2.jpg 1x, ./img/about-2@2x.jpg 2x, ./img/about-2@3x.jpg 3x',
    alt: 'A diptych, split-screen image showing a "before and after" transformation of a scruffy terrier mix dog. **Left side ("before"):** The dog is thin, dirty, and looks sad, sitting in a dim, cold-looking alley. **Right side ("after"):** The exact same dog is now clean, fluffy, healthy, and joyfully running on a sunny green lawn with a bright collar. The visual contrast should be dramatic and hopeful.',
    slideText:
      'Ми рятуємо, реабілітуємо та знаходимо люблячі родини для безпритульних тварин. Наша мета — не просто дати прихисток, а й забезпечити кожному "хвостику" щасливе та повноцінне життя в новій родині.',
  },
  {
    id: 3,
    src: './img/about-3.jpg',
    srcset: './img/about-3.jpg 1x, ./img/about-3@2x.jpg 2x, ./img/about-3@3x.jpg 3x',
    alt: 'A vibrant and joyful group photo of a diverse team of about 10 volunteers and veterinarians of different ages and genders. They are standing outdoors in front of the modern shelter building on a sunny day. Everyone is smiling genuinely at the camera, holding or cuddling happy, healthy dogs and cats of various breeds. The atmosphere is warm, friendly, and full of life. Candid, lifestyle photography.',
    slideText:
      '"Хатинка Лапок" — це команда професійних ветеринарів, кінологів та десятків волонтерів, які щодня вкладають свою душу та час у турботу про наших підопічних. Ми працюємо 24/7, бо їхнє життя залежить від нас.',
  },
  {
    id: 4,
    src: './img/about-4.jpg',
    srcset: './img/about-4.jpg 1x, ./img/about-4@2x.jpg 2x, ./img/about-4@3x.jpg 3x',
    alt: "A wide-angle, photorealistic shot of a modern, well-maintained animal shelter's outdoor play area. The area is spacious, securely fenced, with green grass and various dog agility toys like ramps and tunnels. In the background, clean, bright indoor enclosures are visible through large windows. A few happy dogs are seen playing in the distance. The overall impression is of a safe, clean, and stimulating environment.",
    slideText:
      'Ми створили безпечний та комфортний простір. Кожна тварина отримує якісне харчування, своєчасну ветеринарну допомогу, проходить соціалізацію та гуляє на спеціально обладнаних майданчиках.',
  },
  {
    id: 5,
    src: './img/about-5.jpg',
    srcset: './img/about-5.jpg 1x, ./img/about-5@2x.jpg 2x, ./img/about-5@3x.jpg 3x',
    alt: "An emotional and heartwarming close-up shot from the side. A person is sitting on the floor, tightly and lovingly hugging a medium-sized, grateful-looking dog. We see the person's arms wrapped around the dog and the side of their face resting on the dog's soft fur. The dog's eye is closed in contentment. The lighting is soft and warm, creating an intimate and touching mood. The focus is entirely on the embrace and the powerful bond between human and animal.",
    slideText:
      'Ваша допомога — безцінна. Ви можете взяти тваринку додому, стати волонтером, допомогти фінансово або інформаційно. Кожен маленький внесок наближає нас до великої мети — світу без безпритульних тварин.',
  },
];

const swiperWrapper = document.querySelector('.swiper-wrapper');
const aboutUSMarkup = aboutUsSlides
  .map(({ src, srcset, alt, slideText }) => {
    return `<div class="swiper-slide">
                        <div class="slide-content">
                        <img
                            src="${src}"
                            srcset="${srcset}"
                            alt="${alt}"
                            loading="lazy"
                        />
                        <div class="slide-text">
                            <p>
                            ${slideText}
                            </p>
                        </div>
                        </div>
                </div>`;
  })
  .join('');

swiperWrapper.insertAdjacentHTML('beforeend', aboutUSMarkup);

const swiper = new Swiper('.about-us-gallery', {
  modules: [Navigation, Pagination],

  speed: 800,
  transitionTimingFunction: 'ease-out',
  spaceBetween: 20,
  loop: false,
  centeredSlides: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: true,
  grabCursor: true,
});
