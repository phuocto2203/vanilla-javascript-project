import{p as c,r as u}from"./toastify.1d3ad024.js";import{l as P}from"./vendor.dd84fe55.js";import{t as f}from"./toast.37902003.js";function g(e,s){var o,n,m,p;const t=document.getElementById(e);if(!s||!t)return;const{_page:a,_limit:i,_totalRows:l}=s,r=Math.ceil(l/i);t.dataset.page=a,t.dataset.totalPages=r,a<=1?(o=t.firstElementChild)==null||o.classList.add("disabled"):(n=t.firstElementChild)==null||n.classList.remove("disabled"),a>=r?(m=t.lastElementChild)==null||m.classList.add("disabled"):(p=t.lastElementChild)==null||p.classList.remove("disabled")}function h({elementId:e,defaultParams:s,onChange:t}){const a=document.getElementById(e);if(!a)return;const i=a.firstElementChild.firstElementChild;i&&i.addEventListener("click",r=>{r.preventDefault(),console.log("prev");const o=Number.parseInt(a.dataset.page)||1;o>=2&&(t==null||t(o-1))});const l=a.lastElementChild.lastElementChild;l&&l.addEventListener("click",r=>{r.preventDefault(),console.log("next");const o=Number.parseInt(a.dataset.page)||1,n=a.dataset.totalPages;o<n&&(t==null||t(o+1))})}function v({elementId:e,defaultParams:s,onChange:t}){const a=document.getElementById(e);if(!a)return;s&&s.get("title_like")&&(a.value=s.get("title_like"));const i=P(l=>t==null?void 0:t(l.target.value),500);a.addEventListener("input",i)}async function d(e,s){try{const t=new URL(window.location);e&&t.searchParams.set(e,s),e=="title_like"&&t.searchParams.set("_page",1),history.pushState({},"",t);const{data:a,pagination:i}=await c.getAll(t.searchParams);u("postList",a),g("postsPagination",i)}catch(t){console.log("fail to fetch post list",t)}}function E(){document.addEventListener("post-delete",async e=>{try{const s=e.detail,t=`Are you sure to remove post "${s.title}"?`;window.confirm(t)&&(await c.remove(s.id),await d(),f.success("Remove post successfully!"))}catch(s){console.log("failed to remove post",s),f.error(s.message)}})}(async()=>{try{const e=new URL(window.location);e.searchParams.get("_page")||e.searchParams.set("_page",1),e.searchParams.get("_limit")||e.searchParams.set("_limit",6),history.pushState({},"",e);const s=e.searchParams;E(),h({elementId:"postsPagination",defaultParams:s,onChange:i=>d("_page",i)}),v({elementId:"searchInput",defaultParams:s,onChange:i=>d("title_like",i)});const{data:t,pagination:a}=await c.getAll(s);u("postList",t),g("postsPagination",a)}catch{}})();
