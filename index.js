import{a as w,R as b,S as L,P as v,N as M}from"./assets/vendor-B60fP63C.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=s(r);fetch(r.href,o)}})();const f="https://paw-hut.b.goit.study",g={categories:`${f}/api/categories`,animals:`${f}/api/animals`},n={filters:document.getElementById("categoryFilters"),list:document.getElementById("petsList"),loadMore:document.getElementById("loadMoreBtn"),modal:document.getElementById("petModal"),modalContent:document.getElementById("petModalContent")},a={category:"all",apiPage:1,limit:p(),hasMoreApi:!0,totalPages:null,cache:new Map,isLoading:!1};function p(){return window.innerWidth>=1024?9:8}function m(e){n.filters&&n.filters.querySelectorAll(".pets__filter-btn").forEach(t=>{t.classList.toggle("is-active",t.dataset.category===e)})}function u(e){n.loadMore&&(n.loadMore.style.display=e?"inline-flex":"none")}function l(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}async function y(e){const t=await fetch(e),s=t.headers.get("content-type")||"";if(!t.ok){const i=await t.text().catch(()=>"");throw new Error(`HTTP ${t.status} for ${e}
${i.slice(0,200)}`)}if(!s.includes("application/json")){const i=await t.text().catch(()=>"");throw new Error(`Expected JSON but got "${s}" for ${e}
${i.slice(0,80)}`)}return t.json()}function $(e){return typeof e=="string"?e:(e==null?void 0:e.name)??String(e)}function P(e){return{id:String(e._id??e.id??""),name:String(e.name??"—"),img:String(e.image??""),species:String(e.species??""),age:String(e.age??""),sex:String(e.gender??""),description:String(e.shortDescription??""),categories:Array.isArray(e.categories)?e.categories.map(t=>(t==null?void 0:t.name)??"").filter(Boolean):[],raw:e}}function A(e,t){if(t==="all")return!0;const s=t.toLowerCase();if(e.categories.map(o=>o.toLowerCase()).includes(s))return!0;const r=(e.species||"").toLowerCase();return!!(r.includes(s)||s.includes("гриз")&&(r.includes("щур")||r.includes("хом")||r.includes("миш")||r.includes("гриз")))}function _(e){n.filters.innerHTML="";const t=document.createElement("button");t.type="button",t.className="pets__filter-btn is-active",t.dataset.category="all",t.textContent="Всі",n.filters.appendChild(t),e.map($).filter(Boolean).forEach(s=>{const i=document.createElement("button");i.type="button",i.className="pets__filter-btn",i.dataset.category=s,i.textContent=s,n.filters.appendChild(i)})}function E(e){var s;const t=(s=e.categories)!=null&&s.length?`<ul class="pet-card__tags">${e.categories.slice(0,6).map(i=>`<li class="tag">${l(i)}</li>`).join("")}</ul>`:"";return`
<li class="pet-card" data-id="${l(e.id)}">
  <div class="pet-card__img-wrap">
    <img class="pet-card__img" src="${l(e.img)}" alt="${l(e.name)}" loading="lazy">
  </div>

  <div class="pet-card__body">
    <p class="pet-card__species">${l(e.species)}</p>
    <h3 class="pet-card__name">${l(e.name)}</h3>

    ${t}

    <div class="pet-card__meta">
      ${e.age?`<span>${l(e.age)}</span>`:""}
      ${e.sex?`<span>${l(e.sex)}</span>`:""}
    </div>

    <p class="pet-card__desc">${l(e.description)}</p>

    <button class="pet-card__btn" type="button" data-more>Дізнатись більше</button>
  </div>
</li>`}function S(e,{append:t=!1}={}){const s=e.map(E).join("");t?n.list.insertAdjacentHTML("beforeend",s):n.list.innerHTML=s}function C(e){var t;n.modalContent.innerHTML=`
    <img class="modal-img" src="${l(e.img)}" alt="${l(e.name)}" />
    <div>
      <h3 class="modal-title" id="petModalTitle">${l(e.name)}</h3>
      <p class="modal-sub">${l([e.species,...e.categories].filter(Boolean).join(" · "))}</p>
      <div class="modal-meta">
        ${e.age?`<span><strong>Вік:</strong> ${l(e.age)}</span>`:""}
        ${e.sex?`<span><strong>Стать:</strong> ${l(e.sex)}</span>`:""}
      </div>
      <p class="modal-desc">${l(((t=e.raw)==null?void 0:t.description)??e.description??"")}</p>
    </div>
  `,n.modal.classList.add("is-open"),n.modal.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}function h(){n.modal.classList.remove("is-open"),n.modal.setAttribute("aria-hidden","true"),document.body.style.overflow=""}async function x(e){const t=new URL(g.animals);t.searchParams.set("page",String(e)),t.searchParams.set("limit",String(a.limit));const s=await y(t.toString()),i=(s.animals??[]).map(P),r=s.totalItems;return typeof r=="number"?(a.totalPages=Math.ceil(r/a.limit),a.hasMoreApi=e<a.totalPages):a.hasMoreApi=i.length>=a.limit,i.forEach(o=>a.cache.set(o.id,o)),i}async function d({reset:e=!1,append:t=!1}={}){if(!a.isLoading){a.isLoading=!0,n.loadMore.disabled=!0;try{e&&(n.list.innerHTML="",a.cache.clear(),a.apiPage=1,a.totalPages=null,a.hasMoreApi=!0);const s=[];let i=0;for(;s.length<a.limit&&!(!a.hasMoreApi&&a.apiPage>(a.totalPages??a.apiPage));){const o=(await x(a.apiPage)).filter(c=>A(c,a.category));if(s.push(...o),a.hasMoreApi)a.apiPage+=1;else break;if(i+=1,i>50)break}S(s.slice(0,a.limit),{append:t}),u(a.hasMoreApi)}catch(s){console.error(s),t||(n.list.innerHTML='<li style="padding:16px;color:#8b0000;">Помилка завантаження даних. Дивись console.</li>'),u(!1)}finally{n.loadMore.disabled=!1,a.isLoading=!1}}}async function k(){const e=await y(g.categories);_(Array.isArray(e)?e:[]),m("all")}n.filters.addEventListener("click",async e=>{const t=e.target.closest(".pets__filter-btn");if(!t)return;const s=t.dataset.category;s!==a.category&&(a.category=s,m(s),await d({reset:!0,append:!1}))});n.loadMore.addEventListener("click",async()=>{await d({reset:!1,append:!0})});n.list.addEventListener("click",e=>{var o;if(!e.target.closest("[data-more]"))return;const s=e.target.closest(".pet-card"),i=(o=s==null?void 0:s.dataset)==null?void 0:o.id;if(!i)return;const r=a.cache.get(i);r&&C(r)});n.modal.addEventListener("click",e=>{e.target.closest("[data-modal-close]")&&h()});window.addEventListener("keydown",e=>{e.key==="Escape"&&n.modal.classList.contains("is-open")&&h()});window.addEventListener("resize",()=>{const e=p();e!==a.limit&&(a.limit=e,d({reset:!0,append:!1}))});(async function(){if(!n.filters||!n.list||!n.loadMore||!n.modal||!n.modalContent){console.error("Pets section DOM not found. Check ids in HTML.");return}u(!1),await k(),a.category="all",a.apiPage=1,await d({reset:!0,append:!1})})();const B=document.querySelector("#stories-list");async function H(){try{const e=await w.get("https://paw-hut.b.goit.study/api/feedbacks");O(e.data.feedbacks)}catch(e){console.log("Помилка при завантаженні відгуків:",e)}}function O(e){const t=e.map(i=>`<div class="swiper-slide">
    <div class="feedback-card">
      <div class="stars js-raty" data-score="${i.rate}"></div>
      <p class="card-description">${i.description}</p>
      <h3 class="card-autor">${i.author}</h3>
      </div>
    </div>`).join("");B.insertAdjacentHTML("beforeend",t),T(),document.querySelectorAll(".js-raty").forEach(i=>{try{const r=i.dataset.score;new b(i,{readOnly:!0,score:r,halfShow:!0,starOff:"../svg/star-outline.svg",starOn:"../svg/star-filled.svg",starHalf:"../svg/star-half.svg"}).init()}catch{console.error("Raty error:",err)}})}function T(){new L(".feedbacks-slider",{modules:[v,M],pagination:{el:".swiper-pag",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},navigation:{nextEl:".swiper-next-button",prevEl:".swiper-prev-button",disabledClass:"slider-button-disabled"},breakpoints:{320:{slidesPerView:1},768:{slidesPerView:2}}})}H();
//# sourceMappingURL=index.js.map
