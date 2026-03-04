import{a as n,S as a,P as d}from"./assets/vendor-rnat0iDP.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function c(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const l=document.querySelector("#stories-list");async function u(){try{const r=await n.get("https://paw-hut.b.goit.study/api/feedbacks");f(r.data.feedbacks)}catch(r){console.log("Помилка при завантаженні відгуків:",r)}}function f(r){const s=r.map(i=>`<div class="swiper-slide">
    <div class="feedback-card">
      <div class="stars">${i.rate}</div>
      <p class="card-description">${i.description}</p>
      <h3 class="card-autor">${i.author}</h3>
      </div>
    </div>`).join("");l.insertAdjacentHTML("beforeend",s),p()}function p(){new a(".feedbacks-slider",{modules:[d],pagination:{el:".swiper-pagination",clickable:!0,dynamicBullets:!0,dynamicMainBullets:3},breakpoints:{320:{slidesPerView:1},768:{slidesPerView:2}}})}u();
//# sourceMappingURL=index.js.map
