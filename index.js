import{S as m,N as h,P as y,A as $,a as T}from"./assets/vendor-C4B4MB8H.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerPolicy&&(n.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?n.credentials="include":r.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}})();function l(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}function A(e,t,a){a.innerHTML=`
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
  `,t.classList.add("is-open"),t.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}function b(e){e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"),document.body.style.overflow=""}const f="https://paw-hut.b.goit.study",w={categories:`${f}/api/categories`,animals:`${f}/api/animals`},s={filters:document.getElementById("categoryFilters"),list:document.getElementById("petsList"),loadMore:document.getElementById("loadMoreBtn"),modal:document.getElementById("petModal"),modalContent:document.getElementById("petModalContent"),loader:document.getElementById("petsLoader")},i={category:"all",apiPage:1,limit:v(),hasMoreApi:!0,totalPages:null,cache:new Map,isLoading:!1};function M(){s.loader&&(s.loader.classList.add("is-visible"),s.loader.setAttribute("aria-hidden","false"))}function S(){s.loader&&(s.loader.classList.remove("is-visible"),s.loader.setAttribute("aria-hidden","true"))}function g(e){if(!s.list)return;s.list.classList.toggle("is-loading",e),s.list.querySelectorAll("[data-more]").forEach(a=>{a.disabled=e})}function v(){return window.innerWidth>=1024?9:8}function L(e){s.filters&&s.filters.querySelectorAll(".pets__filter-btn").forEach(t=>{t.classList.toggle("is-active",t.dataset.category===e)})}function p(e){s.loadMore&&(s.loadMore.style.display=e?"inline-flex":"none")}function d(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}async function x(e){const t=await fetch(e),a=t.headers.get("content-type")||"";if(!t.ok){const o=await t.text().catch(()=>"");throw new Error(`HTTP ${t.status} for ${e}
${o.slice(0,200)}`)}if(!a.includes("application/json")){const o=await t.text().catch(()=>"");throw new Error(`Expected JSON but got "${a}" for ${e}
${o.slice(0,80)}`)}return t.json()}function H(e){return typeof e=="string"?e:e?.name??String(e)}function _(e){return{id:String(e._id??e.id??""),name:String(e.name??"—"),img:String(e.image??""),species:String(e.species??""),age:String(e.age??""),sex:String(e.gender??""),shortDescription:String(e.shortDescription??""),description:String(e.description??""),healthStatus:String(e.healthStatus??""),behavior:String(e.behavior??""),categories:Array.isArray(e.categories)?e.categories.map(t=>t?.name??"").filter(Boolean):[],raw:e}}function P(e,t){if(t==="all")return!0;const a=t.toLowerCase();if(e.categories.map(n=>n.toLowerCase()).includes(a))return!0;const r=(e.species||"").toLowerCase();return!!(r.includes(a)||a.includes("гриз")&&(r.includes("щур")||r.includes("хом")||r.includes("миш")||r.includes("гриз")))}function j(e){s.filters.innerHTML="";const t=document.createElement("button");t.type="button",t.className="pets__filter-btn is-active",t.dataset.category="all",t.textContent="Всі",s.filters.appendChild(t),e.map(H).filter(Boolean).forEach(a=>{const o=document.createElement("button");o.type="button",o.className="pets__filter-btn",o.dataset.category=a,o.textContent=a,s.filters.appendChild(o)})}function E(e){const t=e.categories.length?`<ul class="pet-card__tags">${e.categories.slice(0,6).map(a=>`<li class="tag">${d(a)}</li>`).join("")}</ul>`:"";return`
<li class="pet-card" data-id="${d(e.id)}">
  <div class="pet-card__img-wrap">
    <img
      class="pet-card__img"
      src="${d(e.img)}"
      alt="${d(e.name)}"
      loading="lazy"
    >
  </div>

  <div class="pet-card__body">
    <p class="pet-card__species">${d(e.species)}</p>
    <h3 class="pet-card__name">${d(e.name)}</h3>

    ${t}

    <div class="pet-card__meta">
      ${e.age?`<span>${d(e.age)}</span>`:""}
      ${e.sex?`<span>${d(e.sex)}</span>`:""}
    </div>

    <p class="pet-card__desc">${d(e.shortDescription)}</p>

    <button class="pet-card__btn" type="button" data-more>
      Дізнатись більше
    </button>
  </div>
</li>`}function U(e,{append:t=!1}={}){const a=e.map(E).join("");t?s.list.insertAdjacentHTML("beforeend",a):s.list.innerHTML=a}async function k(e){const t=new URL(w.animals);t.searchParams.set("page",String(e)),t.searchParams.set("limit",String(i.limit));const a=await x(t.toString()),o=(a.animals??[]).map(_),r=a.totalItems;return typeof r=="number"?(i.totalPages=Math.ceil(r/i.limit),i.hasMoreApi=e<i.totalPages):i.hasMoreApi=o.length>=i.limit,o.forEach(n=>i.cache.set(n.id,n)),o}async function u({reset:e=!1,append:t=!1}={}){if(!i.isLoading){i.isLoading=!0,s.loadMore&&(s.loadMore.disabled=!0),M(),g(!0);try{e&&(s.list.innerHTML="",i.cache.clear(),i.apiPage=1,i.totalPages=null,i.hasMoreApi=!0);const a=[];let o=0;for(;a.length<i.limit&&!(!i.hasMoreApi&&i.apiPage>(i.totalPages??i.apiPage));){const n=(await k(i.apiPage)).filter(c=>P(c,i.category));if(a.push(...n),i.hasMoreApi)i.apiPage+=1;else break;if(o+=1,o>50)break}U(a.slice(0,i.limit),{append:t}),g(!0),p(i.hasMoreApi)}catch(a){console.error(a),t||(s.list.innerHTML='<li style="padding:16px;color:#8b0000;">Помилка завантаження даних. Дивись console.</li>'),p(!1)}finally{S(),g(!1),s.loadMore&&(s.loadMore.disabled=!1),i.isLoading=!1}}}async function C(){const e=await x(w.categories),t=Array.isArray(e)?e:e?.data??e?.categories??[];j(t),L("all")}s.filters.addEventListener("click",async e=>{const t=e.target.closest(".pets__filter-btn");if(!t)return;const a=t.dataset.category;a!==i.category&&(i.category=a,L(a),await u({reset:!0,append:!1}))});s.loadMore.addEventListener("click",async()=>{await u({reset:!1,append:!0})});s.list.addEventListener("click",e=>{if(i.isLoading||!e.target.closest("[data-more]"))return;const o=e.target.closest(".pet-card")?.dataset?.id;if(!o)return;const r=i.cache.get(o);r&&A(r,s.modal,s.modalContent)});s.modal.addEventListener("click",e=>{e.target.closest("[data-modal-close]")&&b(s.modal)});window.addEventListener("keydown",e=>{e.key==="Escape"&&s.modal.classList.contains("is-open")&&b(s.modal)});window.addEventListener("resize",()=>{const e=v();e!==i.limit&&(i.limit=e,u({reset:!0,append:!1}))});(async function(){if(!s.filters||!s.list||!s.loadMore||!s.modal||!s.modalContent||!s.loader){console.error("Pets section DOM not found. Check ids in HTML.");return}p(!1),await C(),i.category="all",i.apiPage=1,await u({reset:!0,append:!1})})();const R=[{id:1,src:new URL("/Tailed-House/assets/about-1-Dyg_09HG.jpg",import.meta.url).href,srcset:`${new URL("/Tailed-House/assets/about-1-Dyg_09HG.jpg",import.meta.url).href} 1x, ${new URL("/Tailed-House/assets/about-1@2x-B5epmOPr.jpg",import.meta.url).href} 2x, ${new URL("/Tailed-House/assets/about-1@3x-CO8iXeZu.jpg",import.meta.url).href} 3x`,alt:"Authentic-looking, grainy black-and-white photo from around 2005. A young, caring woman is kneeling down on a city street and gently offering a piece of food to a cautious but hopeful-looking mixed-breed stray dog. The image has a vintage, documentary feel, with natural lighting and high contrast. The focus is on the emotional connection and the moment of first trust. Shot on 35mm film.",slideText:"Все почалося у 2015 році з кількох небайдужих людей та одного врятованого собаки. Сьогодні ми — один з найбільших притулків у регіоні, але наша мета незмінна: дати другий шанс тим, кого зрадили."},{id:2,src:new URL("/Tailed-House/assets/about-2-B0wsUrtw.jpg",import.meta.url).href,srcset:`${new URL("/Tailed-House/assets/about-2-B0wsUrtw.jpg",import.meta.url).href} 1x, ${new URL("/Tailed-House/assets/about-2@2x-DEMDPXPM.jpg",import.meta.url).href} 2x, ${new URL("/Tailed-House/assets/about-2@3x-BDqEKB22.jpg",import.meta.url).href} 3x`,alt:'A diptych, split-screen image showing a "before and after" transformation of a scruffy terrier mix dog. **Left side ("before"):** The dog is thin, dirty, and looks sad, sitting in a dim, cold-looking alley. **Right side ("after"):** The exact same dog is now clean, fluffy, healthy, and joyfully running on a sunny green lawn with a bright collar. The visual contrast should be dramatic and hopeful.',slideText:'Ми рятуємо, реабілітуємо та знаходимо люблячі родини для безпритульних тварин. Наша мета — не просто дати прихисток, а й забезпечити кожному "хвостику" щасливе та повноцінне життя в новій родині.'},{id:3,src:new URL("/Tailed-House/assets/about-3-CyQEdR7Z.jpg",import.meta.url).href,srcset:`${new URL("/Tailed-House/assets/about-3-CyQEdR7Z.jpg",import.meta.url).href} 1x, ${new URL("/Tailed-House/assets/about-3@2x-C5qjDF_i.jpg",import.meta.url).href} 2x, ${new URL("/Tailed-House/assets/about-3@3x-Bn4lbd5Y.jpg",import.meta.url).href} 3x`,alt:"A vibrant and joyful group photo of a diverse team of about 10 volunteers and veterinarians of different ages and genders. They are standing outdoors in front of the modern shelter building on a sunny day. Everyone is smiling genuinely at the camera, holding or cuddling happy, healthy dogs and cats of various breeds. The atmosphere is warm, friendly, and full of life. Candid, lifestyle photography.",slideText:'"Хатинка Лапок" — це команда професійних ветеринарів, кінологів та десятків волонтерів, які щодня вкладають свою душу та час у турботу про наших підопічних. Ми працюємо 24/7, бо їхнє життя залежить від нас.'},{id:4,src:new URL("/Tailed-House/assets/about-4-CgiQ3vx4.jpg",import.meta.url).href,srcset:`${new URL("/Tailed-House/assets/about-4-CgiQ3vx4.jpg",import.meta.url).href} 1x, ${new URL("/Tailed-House/assets/about-4@2x-D6n4cBo1.jpg",import.meta.url).href} 2x, ${new URL("/Tailed-House/assets/about-4@3x-D_eIRLlJ.jpg",import.meta.url).href} 3x`,alt:"A wide-angle, photorealistic shot of a modern, well-maintained animal shelter's outdoor play area. The area is spacious, securely fenced, with green grass and various dog agility toys like ramps and tunnels. In the background, clean, bright indoor enclosures are visible through large windows. A few happy dogs are seen playing in the distance. The overall impression is of a safe, clean, and stimulating environment.",slideText:"Ми створили безпечний та комфортний простір. Кожна тварина отримує якісне харчування, своєчасну ветеринарну допомогу, проходить соціалізацію та гуляє на спеціально обладнаних майданчиках."},{id:5,src:new URL("/Tailed-House/assets/about-5-GOUWx5zq.jpg",import.meta.url).href,srcset:`${new URL("/Tailed-House/assets/about-5-GOUWx5zq.jpg",import.meta.url).href} 1x, ${new URL("/Tailed-House/assets/about-5@2x-DDWUS0c_.jpg",import.meta.url).href} 2x, ${new URL("/Tailed-House/assets/about-5@3x-C0BP2Gvg.jpg",import.meta.url).href} 3x`,alt:"An emotional and heartwarming close-up shot from the side. A person is sitting on the floor, tightly and lovingly hugging a medium-sized, grateful-looking dog. We see the person's arms wrapped around the dog and the side of their face resting on the dog's soft fur. The dog's eye is closed in contentment. The lighting is soft and warm, creating an intimate and touching mood. The focus is entirely on the embrace and the powerful bond between human and animal.",slideText:"Ваша допомога — безцінна. Ви можете взяти тваринку додому, стати волонтером, допомогти фінансово або інформаційно. Кожен маленький внесок наближає нас до великої мети — світу без безпритульних тварин."}],B=document.querySelector(".swiper-wrapper"),I=R.map(({src:e,srcset:t,alt:a,slideText:o})=>`<div class="swiper-slide">
                        <div class="slide-content">
                        <img
                            src="${e}"
                            srcset="${t}"
                            alt="${a}"
                            loading="lazy"
                        />
                        <div class="slide-text">
                            <p>
                            ${o}
                            </p>
                        </div>
                        </div>
                </div>`).join("");B.insertAdjacentHTML("beforeend",I);new m(".about-us-gallery",{modules:[h,y],speed:800,transitionTimingFunction:"ease-out",spaceBetween:20,loop:!1,centeredSlides:!1,pagination:{el:".swiper-pagination",clickable:!0},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},keyboard:!0,grabCursor:!0});new $(".faq__accordion",{duration:300,showMultiple:!1,collapse:!0});const D=document.querySelector("#stories-list");function O(e){return Array.from({length:5},(t,a)=>a<Math.floor(e)?'<img src="./svg/star-filled.svg" width="20" height="19" alt="★">':a<e?'<img src="./svg/star-half.svg" width="20" height="19" alt="½">':'<img src="./svg/star-outline.svg" width="20" height="19" alt="☆">').join("")}async function q(){try{const e=await T.get("https://paw-hut.b.goit.study/api/feedbacks");N(e.data.feedbacks)}catch(e){console.log("Помилка при завантаженні відгуків:",e)}}function N(e){const t=e.map(a=>`<div class="swiper-slide">
    <div class="feedback-card">
      <div class="stars">${O(a.rate)}</div>
      <p class="card-description">${a.description}</p>
      <h3 class="card-autor">${a.author}</h3>
    </div>
  </div>`).join("");D.insertAdjacentHTML("beforeend",t),z()}function z(){new m(".feedbacks-slider",{modules:[y,h],pagination:{el:".swiper-pag",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{nextEl:".swiper-next-button",prevEl:".swiper-prev-button",disabledClass:"slider-button-disabled"},breakpoints:{320:{slidesPerView:1},768:{slidesPerView:2}}})}q();
//# sourceMappingURL=index.js.map
