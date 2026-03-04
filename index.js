import{a as w,S as b,P as L}from"./assets/vendor-rnat0iDP.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&r(c)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();const f="https://paw-hut.b.goit.study",p={categories:`${f}/api/categories`,animals:`${f}/api/animals`},n={filters:document.getElementById("categoryFilters"),list:document.getElementById("petsList"),loadMore:document.getElementById("loadMoreBtn"),modal:document.getElementById("petModal"),modalContent:document.getElementById("petModalContent")},s={category:"all",apiPage:1,limit:g(),hasMoreApi:!0,totalPages:null,cache:new Map,isLoading:!1};function g(){return window.innerWidth>=1024?9:8}function m(e){n.filters&&n.filters.querySelectorAll(".pets__filter-btn").forEach(t=>{t.classList.toggle("is-active",t.dataset.category===e)})}function u(e){n.loadMore&&(n.loadMore.style.display=e?"inline-flex":"none")}function l(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}async function y(e){const t=await fetch(e),a=t.headers.get("content-type")||"";if(!t.ok){const r=await t.text().catch(()=>"");throw new Error(`HTTP ${t.status} for ${e}
${r.slice(0,200)}`)}if(!a.includes("application/json")){const r=await t.text().catch(()=>"");throw new Error(`Expected JSON but got "${a}" for ${e}
${r.slice(0,80)}`)}return t.json()}function M(e){return typeof e=="string"?e:(e==null?void 0:e.name)??String(e)}function $(e){return{id:String(e._id??e.id??""),name:String(e.name??"—"),img:String(e.image??""),species:String(e.species??""),age:String(e.age??""),sex:String(e.gender??""),description:String(e.shortDescription??""),categories:Array.isArray(e.categories)?e.categories.map(t=>(t==null?void 0:t.name)??"").filter(Boolean):[],raw:e}}function v(e,t){if(t==="all")return!0;const a=t.toLowerCase();if(e.categories.map(o=>o.toLowerCase()).includes(a))return!0;const i=(e.species||"").toLowerCase();return!!(i.includes(a)||a.includes("гриз")&&(i.includes("щур")||i.includes("хом")||i.includes("миш")||i.includes("гриз")))}function P(e){n.filters.innerHTML="";const t=document.createElement("button");t.type="button",t.className="pets__filter-btn is-active",t.dataset.category="all",t.textContent="Всі",n.filters.appendChild(t),e.map(M).filter(Boolean).forEach(a=>{const r=document.createElement("button");r.type="button",r.className="pets__filter-btn",r.dataset.category=a,r.textContent=a,n.filters.appendChild(r)})}function _(e){var a;const t=(a=e.categories)!=null&&a.length?`<ul class="pet-card__tags">${e.categories.slice(0,6).map(r=>`<li class="tag">${l(r)}</li>`).join("")}</ul>`:"";return`
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
</li>`}function A(e,{append:t=!1}={}){const a=e.map(_).join("");t?n.list.insertAdjacentHTML("beforeend",a):n.list.innerHTML=a}function E(e){var t;n.modalContent.innerHTML=`
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
  `,n.modal.classList.add("is-open"),n.modal.setAttribute("aria-hidden","false"),document.body.style.overflow="hidden"}function h(){n.modal.classList.remove("is-open"),n.modal.setAttribute("aria-hidden","true"),document.body.style.overflow=""}async function S(e){const t=new URL(p.animals);t.searchParams.set("page",String(e)),t.searchParams.set("limit",String(s.limit));const a=await y(t.toString()),r=(a.animals??[]).map($),i=a.totalItems;return typeof i=="number"?(s.totalPages=Math.ceil(i/s.limit),s.hasMoreApi=e<s.totalPages):s.hasMoreApi=r.length>=s.limit,r.forEach(o=>s.cache.set(o.id,o)),r}async function d({reset:e=!1,append:t=!1}={}){if(!s.isLoading){s.isLoading=!0,n.loadMore.disabled=!0;try{e&&(n.list.innerHTML="",s.cache.clear(),s.apiPage=1,s.totalPages=null,s.hasMoreApi=!0);const a=[];let r=0;for(;a.length<s.limit&&!(!s.hasMoreApi&&s.apiPage>(s.totalPages??s.apiPage));){const o=(await S(s.apiPage)).filter(c=>v(c,s.category));if(a.push(...o),s.hasMoreApi)s.apiPage+=1;else break;if(r+=1,r>50)break}A(a.slice(0,s.limit),{append:t}),u(s.hasMoreApi)}catch(a){console.error(a),t||(n.list.innerHTML='<li style="padding:16px;color:#8b0000;">Помилка завантаження даних. Дивись console.</li>'),u(!1)}finally{n.loadMore.disabled=!1,s.isLoading=!1}}}async function C(){const e=await y(p.categories);P(Array.isArray(e)?e:[]),m("all")}n.filters.addEventListener("click",async e=>{const t=e.target.closest(".pets__filter-btn");if(!t)return;const a=t.dataset.category;a!==s.category&&(s.category=a,m(a),await d({reset:!0,append:!1}))});n.loadMore.addEventListener("click",async()=>{await d({reset:!1,append:!0})});n.list.addEventListener("click",e=>{var o;if(!e.target.closest("[data-more]"))return;const a=e.target.closest(".pet-card"),r=(o=a==null?void 0:a.dataset)==null?void 0:o.id;if(!r)return;const i=s.cache.get(r);i&&E(i)});n.modal.addEventListener("click",e=>{e.target.closest("[data-modal-close]")&&h()});window.addEventListener("keydown",e=>{e.key==="Escape"&&n.modal.classList.contains("is-open")&&h()});window.addEventListener("resize",()=>{const e=g();e!==s.limit&&(s.limit=e,d({reset:!0,append:!1}))});(async function(){if(!n.filters||!n.list||!n.loadMore||!n.modal||!n.modalContent){console.error("Pets section DOM not found. Check ids in HTML.");return}u(!1),await C(),s.category="all",s.apiPage=1,await d({reset:!0,append:!1})})();const k=document.querySelector("#stories-list");async function x(){try{const e=await w.get("https://paw-hut.b.goit.study/api/feedbacks");B(e.data.feedbacks)}catch(e){console.log("Помилка при завантаженні відгуків:",e)}}function B(e){const t=e.map(a=>`<div class="swiper-slide">
    <div class="feedback-card">
      <div class="stars">${a.rate}</div>
      <p class="card-description">${a.description}</p>
      <h3 class="card-autor">${a.author}</h3>
      </div>
    </div>`).join("");k.insertAdjacentHTML("beforeend",t),T()}function T(){new b(".feedbacks-slider",{modules:[L],pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},breakpoints:{320:{slidesPerView:1},768:{slidesPerView:2}}})}x();
//# sourceMappingURL=index.js.map
