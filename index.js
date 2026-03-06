import{S as p,N as m,P as h,a as L,R as M}from"./assets/vendor-BJXAhXsV.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function s(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerPolicy&&(r.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?r.credentials="include":n.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=s(n);fetch(n.href,r)}})();const f="https://paw-hut.b.goit.study",y={categories:`${f}/api/categories`,animals:`${f}/api/animals`},a={filters:document.getElementById("categoryFilters"),list:document.getElementById("petsList"),loadMore:document.getElementById("loadMoreBtn"),modal:document.getElementById("petModal"),modalContent:document.getElementById("petModalContent"),loader:document.getElementById("petsLoader")},i={category:"all",apiPage:1,limit:b(),hasMoreApi:!0,totalPages:null,cache:new Map,isLoading:!1};function A(){a.loader&&(a.loader.classList.add("is-visible"),a.loader.setAttribute("aria-hidden","false"))}function $(){a.loader&&(a.loader.classList.remove("is-visible"),a.loader.setAttribute("aria-hidden","true"))}function u(e){if(!a.list)return;a.list.classList.toggle("is-loading",e),a.list.querySelectorAll("[data-more]").forEach(s=>{s.disabled=e})}function b(){return window.innerWidth>=1024?9:8}function w(e){a.filters&&a.filters.querySelectorAll(".pets__filter-btn").forEach(t=>{t.classList.toggle("is-active",t.dataset.category===e)})}function g(e){a.loadMore&&(a.loadMore.style.display=e?"inline-flex":"none")}function l(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}async function v(e){const t=await fetch(e),s=t.headers.get("content-type")||"";if(!t.ok){const o=await t.text().catch(()=>"");throw new Error(`HTTP ${t.status} for ${e}
${o.slice(0,200)}`)}if(!s.includes("application/json")){const o=await t.text().catch(()=>"");throw new Error(`Expected JSON but got "${s}" for ${e}
${o.slice(0,80)}`)}return t.json()}function S(e){return typeof e=="string"?e:(e==null?void 0:e.name)??String(e)}function j(e){return{id:String(e._id??e.id??""),name:String(e.name??"—"),img:String(e.image??""),species:String(e.species??""),age:String(e.age??""),sex:String(e.gender??""),shortDescription:String(e.shortDescription??""),description:String(e.description??""),healthStatus:String(e.healthStatus??""),behavior:String(e.behavior??""),categories:Array.isArray(e.categories)?e.categories.map(t=>(t==null?void 0:t.name)??"").filter(Boolean):[],raw:e}}function T(e,t){if(t==="all")return!0;const s=t.toLowerCase();if(e.categories.map(r=>r.toLowerCase()).includes(s))return!0;const n=(e.species||"").toLowerCase();return!!(n.includes(s)||s.includes("гриз")&&(n.includes("щур")||n.includes("хом")||n.includes("миш")||n.includes("гриз")))}function P(e){a.filters.innerHTML="";const t=document.createElement("button");t.type="button",t.className="pets__filter-btn is-active",t.dataset.category="all",t.textContent="Всі",a.filters.appendChild(t),e.map(S).filter(Boolean).forEach(s=>{const o=document.createElement("button");o.type="button",o.className="pets__filter-btn",o.dataset.category=s,o.textContent=s,a.filters.appendChild(o)})}function E(e){const t=e.categories.length?`<ul class="pet-card__tags">${e.categories.slice(0,6).map(s=>`<li class="tag">${l(s)}</li>`).join("")}</ul>`:"";return`
<li class="pet-card" data-id="${l(e.id)}">
  <div class="pet-card__img-wrap">
    <img
      class="pet-card__img"
      src="${l(e.img)}"
      alt="${l(e.name)}"
      loading="lazy"
    >
  </div>

  <div class="pet-card__body">
    <p class="pet-card__species">${l(e.species)}</p>
    <h3 class="pet-card__name">${l(e.name)}</h3>

    ${t}

    <div class="pet-card__meta">
      ${e.age?`<span>${l(e.age)}</span>`:""}
      ${e.sex?`<span>${l(e.sex)}</span>`:""}
    </div>

    <p class="pet-card__desc">${l(e.shortDescription)}</p>

    <button class="pet-card__btn" type="button" data-more>
      Дізнатись більше
    </button>
  </div>
</li>`}function _(e,{append:t=!1}={}){const s=e.map(E).join("");t?a.list.insertAdjacentHTML("beforeend",s):a.list.innerHTML=s}function k(e){a.modalContent.innerHTML=`
    <img class="modal-img" src="${l(e.img)}" alt="${l(e.name)}" />

    <div class="modal-header">
      <p class="modal-sub">${l(e.species)}</p>
      <h3 class="modal-title" id="petModalTitle">${l(e.name)}</h3>
      <div class="modal-meta">
        ${e.age?`<span>${l(e.age)}</span>`:""}
        ${e.sex?`<span>${l(e.sex)}</span>`:""}
      </div>
    </div>

    <div class="modal-desc">
      <h4 class="modal-desc-title">Опис:</h4>
      <p class="modal-desc-text">${l(e.description)}</p>

      <h4 class="modal-desc-title">Здоровʼя:</h4>
      <p class="modal-desc-text">${l(e.healthStatus)}</p>

      <h4 class="modal-desc-title">Поведінка:</h4>
      <p class="modal-desc-text">${l(e.behavior)}</p>
    </div>

    <button class="modal-btn" type="button">Взяти додому</button>
  `,a.modal.classList.add("is-open"),a.modal.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}function x(){a.modal.classList.remove("is-open"),a.modal.setAttribute("aria-hidden","true"),document.body.style.overflow=""}async function C(e){const t=new URL(y.animals);t.searchParams.set("page",String(e)),t.searchParams.set("limit",String(i.limit));const s=await v(t.toString()),o=(s.animals??[]).map(j),n=s.totalItems;return typeof n=="number"?(i.totalPages=Math.ceil(n/i.limit),i.hasMoreApi=e<i.totalPages):i.hasMoreApi=o.length>=i.limit,o.forEach(r=>i.cache.set(r.id,r)),o}async function d({reset:e=!1,append:t=!1}={}){if(!i.isLoading){i.isLoading=!0,a.loadMore&&(a.loadMore.disabled=!0),A(),u(!0);try{e&&(a.list.innerHTML="",i.cache.clear(),i.apiPage=1,i.totalPages=null,i.hasMoreApi=!0);const s=[];let o=0;for(;s.length<i.limit&&!(!i.hasMoreApi&&i.apiPage>(i.totalPages??i.apiPage));){const r=(await C(i.apiPage)).filter(c=>T(c,i.category));if(s.push(...r),i.hasMoreApi)i.apiPage+=1;else break;if(o+=1,o>50)break}_(s.slice(0,i.limit),{append:t}),u(!0),g(i.hasMoreApi)}catch(s){console.error(s),t||(a.list.innerHTML='<li style="padding:16px;color:#8b0000;">Помилка завантаження даних. Дивись console.</li>'),g(!1)}finally{$(),u(!1),a.loadMore&&(a.loadMore.disabled=!1),i.isLoading=!1}}}async function B(){const e=await v(y.categories),t=Array.isArray(e)?e:(e==null?void 0:e.data)??(e==null?void 0:e.categories)??[];P(t),w("all")}a.filters.addEventListener("click",async e=>{const t=e.target.closest(".pets__filter-btn");if(!t)return;const s=t.dataset.category;s!==i.category&&(i.category=s,w(s),await d({reset:!0,append:!1}))});a.loadMore.addEventListener("click",async()=>{await d({reset:!1,append:!0})});a.list.addEventListener("click",e=>{var r;if(i.isLoading||!e.target.closest("[data-more]"))return;const s=e.target.closest(".pet-card"),o=(r=s==null?void 0:s.dataset)==null?void 0:r.id;if(!o)return;const n=i.cache.get(o);n&&k(n)});a.modal.addEventListener("click",e=>{e.target.closest("[data-modal-close]")&&x()});window.addEventListener("keydown",e=>{e.key==="Escape"&&a.modal.classList.contains("is-open")&&x()});window.addEventListener("resize",()=>{const e=b();e!==i.limit&&(i.limit=e,d({reset:!0,append:!1}))});(async function(){if(!a.filters||!a.list||!a.loadMore||!a.modal||!a.modalContent||!a.loader){console.error("Pets section DOM not found. Check ids in HTML.");return}g(!1),await B(),i.category="all",i.apiPage=1,await d({reset:!0,append:!1})})();const H=[{id:1,src:"/img/about-1.jpg",srcset:"img/about-1.jpg 1x, img/about-1@2x.jpg 2x, img/about-1@3x.jpg 3x",alt:"Authentic-looking, grainy black-and-white photo from around 2005. A young, caring woman is kneeling down on a city street and gently offering a piece of food to a cautious but hopeful-looking mixed-breed stray dog. The image has a vintage, documentary feel, with natural lighting and high contrast. The focus is on the emotional connection and the moment of first trust. Shot on 35mm film.",slideText:"Все почалося у 2015 році з кількох небайдужих людей та одного врятованого собаки. Сьогодні ми — один з найбільших притулків у регіоні, але наша мета незмінна: дати другий шанс тим, кого зрадили."},{id:2,src:"/img/about-2.jpg",srcset:"img/about-2.jpg 1x, img/about-2@2x.jpg 2x, img/about-2@3x.jpg 3x",alt:'A diptych, split-screen image showing a "before and after" transformation of a scruffy terrier mix dog. **Left side ("before"):** The dog is thin, dirty, and looks sad, sitting in a dim, cold-looking alley. **Right side ("after"):** The exact same dog is now clean, fluffy, healthy, and joyfully running on a sunny green lawn with a bright collar. The visual contrast should be dramatic and hopeful.',slideText:'Ми рятуємо, реабілітуємо та знаходимо люблячі родини для безпритульних тварин. Наша мета — не просто дати прихисток, а й забезпечити кожному "хвостику" щасливе та повноцінне життя в новій родині.'},{id:3,src:"/img/about-3.jpg",srcset:"img/about-3.jpg 1x, img/about-3@2x.jpg 2x,img/about-3@3x.jpg 3x",alt:"A vibrant and joyful group photo of a diverse team of about 10 volunteers and veterinarians of different ages and genders. They are standing outdoors in front of the modern shelter building on a sunny day. Everyone is smiling genuinely at the camera, holding or cuddling happy, healthy dogs and cats of various breeds. The atmosphere is warm, friendly, and full of life. Candid, lifestyle photography.",slideText:'"Хатинка Лапок" — це команда професійних ветеринарів, кінологів та десятків волонтерів, які щодня вкладають свою душу та час у турботу про наших підопічних. Ми працюємо 24/7, бо їхнє життя залежить від нас.'},{id:4,src:"/img/about-4.jpg",srcset:"img/about-4.jpg 1x, img/about-4@2x.jpg 2x, img/about-4@3x.jpg 3x",alt:"A wide-angle, photorealistic shot of a modern, well-maintained animal shelter's outdoor play area. The area is spacious, securely fenced, with green grass and various dog agility toys like ramps and tunnels. In the background, clean, bright indoor enclosures are visible through large windows. A few happy dogs are seen playing in the distance. The overall impression is of a safe, clean, and stimulating environment.",slideText:"Ми створили безпечний та комфортний простір. Кожна тварина отримує якісне харчування, своєчасну ветеринарну допомогу, проходить соціалізацію та гуляє на спеціально обладнаних майданчиках."},{id:5,src:"/img/about-5.jpg",srcset:"img/about-5.jpg 1x, img/about-5@2x.jpg 2x, img/about-5@3x.jpg 3x",alt:"An emotional and heartwarming close-up shot from the side. A person is sitting on the floor, tightly and lovingly hugging a medium-sized, grateful-looking dog. We see the person's arms wrapped around the dog and the side of their face resting on the dog's soft fur. The dog's eye is closed in contentment. The lighting is soft and warm, creating an intimate and touching mood. The focus is entirely on the embrace and the powerful bond between human and animal.",slideText:"Ваша допомога — безцінна. Ви можете взяти тваринку додому, стати волонтером, допомогти фінансово або інформаційно. Кожен маленький внесок наближає нас до великої мети — світу без безпритульних тварин."}],I=document.querySelector(".swiper-wrapper"),O=H.map(({src:e,srcset:t,alt:s,slideText:o})=>`<div class="swiper-slide">
                        <div class="slide-content">
                        <img
                            src="${e}"
                            srcset="${t}"
                            alt="${s}"
                            loading="lazy"
                        />
                        <div class="slide-text">
                            <p>
                            ${o}
                            </p>
                        </div>
                        </div>
                </div>`).join("");I.insertAdjacentHTML("beforeend",O);new p(".about-us-gallery",{modules:[m,h],speed:800,transitionTimingFunction:"ease-out",spaceBetween:20,loop:!1,centeredSlides:!1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},keyboard:!0,grabCursor:!0});const N=document.querySelector("#stories-list");async function q(){try{const e=await L.get("https://paw-hut.b.goit.study/api/feedbacks");z(e.data.feedbacks)}catch(e){console.log("Помилка при завантаженні відгуків:",e)}}function z(e){const t=e.map(o=>`<div class="swiper-slide">
    <div class="feedback-card">
      <div class="stars js-raty" data-score="${o.rate}"></div>
      <p class="card-description">${o.description}</p>
      <h3 class="card-autor">${o.author}</h3>
      </div>
    </div>`).join("");N.insertAdjacentHTML("beforeend",t),R(),document.querySelectorAll(".js-raty").forEach(o=>{try{const n=o.dataset.score;new M(o,{readOnly:!0,score:n,halfShow:!0,starOff:"/svg/star-outline.svg",starOn:"/svg/star-filled.svg",starHalf:"/svg/star-half.svg"}).init()}catch{console.error("Raty error:",err)}})}function R(){new p(".feedbacks-slider",{modules:[h,m],pagination:{el:".swiper-pag",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{nextEl:".swiper-next-button",prevEl:".swiper-prev-button",disabledClass:"slider-button-disabled"},breakpoints:{320:{slidesPerView:1},768:{slidesPerView:2}}})}q();
//# sourceMappingURL=index.js.map
