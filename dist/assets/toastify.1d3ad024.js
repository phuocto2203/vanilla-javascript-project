import{a as m,d as f,r as p}from"./vendor.dd84fe55.js";const h=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function o(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerpolicy&&(i.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?i.credentials="include":n.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=o(n);fetch(n.href,i)}};h();const s=m.create({baseURL:"https://js-post-api.herokuapp.com/api",headers:{"content-type":"application/json","Content-Type":"multipart/form-data"}});s.interceptors.request.use(async e=>e);s.interceptors.response.use(e=>e&&e.data?e.data:e,e=>{throw console.log("axiosClient - response error",e.response),e.response?new Error(e):new Error("Network error. Please try again later.")});const v={getAll(e){const t="/posts";return s.get(t,{params:e})},getById(e){const t=`/posts/${e}`;return s.get(t)},add(e){const t="/posts";return s.post(t,e)},update(e){const t=`/posts/${e.id}`;return s.patch(t,e)},addFormData(e){const t="/with-thumbnail/posts";return s.post(t,e,{headers:{"Content-Type":"multipart/form-data"}})},updateFormData(e){const t=`/with-thumbnail/posts/${e.get("id")}`;return s.patch(t,e,{headers:{"Content-Type":"multipart/form-data"}})},remove(e){const t=`/posts/${e}`;return s.delete(t)}};function d(e,t,o){if(!e)return;const r=e.querySelector(t);r&&(r.textContent=o)}function y(e,t){return e.length<=t?e:`${e.slice(0,t-1)}...`}function b(e,t,o){if(!e)return;const r=e.querySelector(t);r&&(r.value=o)}function w(e,t,o){if(!e)return;const r=e.querySelector(t);r&&(r.style.backgroundImage=`url("${o}")`)}function C(e){if(e<=0)return-1;const t=Math.random()*e;return Math.round(t)}f.extend(p);function g(e){if(!!e)try{const o=document.getElementById("postTemplate");if(!o)return;const r=o.content.firstElementChild.cloneNode(!0);if(!r)return;d(r,'[data-id="title"]',e.title),d(r,'[data-id="description"]',y(e.description,100)),d(r,'[data-id="author"]',e.author);var t=f(e.updatedAt).fromNow();d(r,'[data-id ="timeSpan"]',`- ${t}`);const n=r.querySelector('[data-id="thumbnail"]');n&&(n.src=e.imageUrl,n.addEventListener("error",()=>{n.src="./images/recipe.jpg"}));const i=r.firstElementChild;i&&i.addEventListener("click",u=>{const c=r.querySelector('[data-id="menu"]');c&&c.contains(u.target)||window.location.assign(`/post-detail.html?id=${e.id}`)});const a=r.querySelector('[data-id="edit"]');a&&a.addEventListener("click",()=>{window.location.assign(`/add-edit-post.html?id=${e.id}`)});const l=r.querySelector('[data-id="remove"]');return l&&l.addEventListener("click",()=>{const u=new CustomEvent("post-delete",{bubbles:!0,detail:e});l.dispatchEvent(u)}),r}catch(o){console.log("failed to create post item",o)}}function q(e,t){if(!Array.isArray(t))return;const o=document.getElementById(e);!o||(o.textContent="",t.forEach((r,n)=>{const i=g(r);o.appendChild(i)}))}export{b as a,w as b,C as c,v as p,q as r,d as s};
