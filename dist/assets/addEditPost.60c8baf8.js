var I=Object.defineProperty;var g=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,w=Object.prototype.propertyIsEnumerable;var u=(t,e,a)=>e in t?I(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,p=(t,e)=>{for(var a in e||(e={}))S.call(e,a)&&u(t,a,e[a]);if(g)for(var a of g(e))w.call(e,a)&&u(t,a,e[a]);return t};import{a as s,b as l,s as U,c as f,p as m}from"./toastify.1d3ad024.js";/* empty css                    */import{c as v,b as r,e as h}from"./vendor.dd84fe55.js";import{t as y}from"./toast.37902003.js";const d={PICSUM:"picsum",UPLOAD:"upload"};function E(t,e){s(t,'[name="title"]',e==null?void 0:e.title),s(t,'[name="author"]',e==null?void 0:e.author),s(t,'[name="description"]',e==null?void 0:e.description),s(t,'[name = "imageUrl"]',e==null?void 0:e.imageUrl),l(document,"#postHeroImage",e==null?void 0:e.imageUrl)}function L(t){const e={},a=new FormData(t);for(const[o,i]of a)e[o]=i;return e}function F(){return v().shape({title:r().required("Please enter title"),author:r().required("Please enter author").test("at-least-two-words","Please enter at least two words",t=>t.split(" ").filter(e=>!!e&&e.length>=3).length>=2),description:r(),imageSource:r().required("Please select an image source").oneOf([d.PICSUM,d.UPLOAD],"Invalid image source"),imageUrl:r().when("imageSource",{is:d.PICSUM,then:r().required("Please random a background image").url("Please enter a valid url")}),image:h().when("imageSource",{is:d.UPLOAD,then:h().test("required","Please select an image to upload",t=>Boolean(t==null?void 0:t.name)).test("max-3mb","The image is too large, max size is 3mb",t=>{const e=(t==null?void 0:t.size)||0,a=3*1024*1024;return e<=a})})})}function P(t,e,a){const o=t.querySelector(`[name="${e}"]`);o&&(o.setCustomValidity(a),U(o.parentElement,".invalid-feedback",a))}async function D(t,e){try{["title","author","imageUrl","image"].forEach(i=>P(t,i,"")),await F().validate(e,{abortEarly:!1})}catch(o){const i={};for(const n of o.inner){const c=n.path;i[c]||(P(t,c,n.message),console.log(n.message),i[c]=!0)}}const a=t.checkValidity();return a||t.classList.add("was-validated"),a}function q(t){const e=document.getElementById("postChangeImage");!e||e.addEventListener("click",()=>{const a=`https://picsum.photos/id/${f(1e3)}/1368/400`;s(t,'[name = "imageUrl"]',a),l(document,"#postHeroImage",a)})}function b(t,e){t.querySelectorAll('[data-id="imageSource"]').forEach(o=>{o.hidden=o.dataset.imageSource!==e})}function k(t){t.querySelectorAll('[name="imageSource"]').forEach(a=>{a.addEventListener("change",o=>b(t,o.target.value))})}function A(t){const e=t.querySelector('[name="image"]');!e||e.addEventListener("change",a=>{const o=a.target.files[0];if(o){const i=URL.createObjectURL(o);l(document,"#postHeroImage",i)}})}function C({formId:t,defaultValues:e,onSubmit:a}){const o=document.getElementById(t);!o||(E(o,e),q(o),k(o),A(o),o.addEventListener("submit",async i=>{i.preventDefault();const n=L(o);n.id=e.id,await D(o,n)&&await(a==null?void 0:a(n))}))}function B(t){const e=p({},t);return e.imageSource=="upload"?delete e.imageUrl:delete e.image,delete e.imageSource,e.id||delete e.id,e}function R(t){const e=new FormData;for(const a in t)e.set(a,t[a]);return e}async function $(t){try{const e=B(t),a=R(e),o=t.id?await m.updateFormData(a):await m.addFormData(a);y.success("Save post successfully! "),setTimeout(()=>{window.location.assign(`/post-detail.html?id=${o.id}`)},2e3)}catch(e){console.log("failed to save post",e),y.error("Error: ",e)}}(async()=>{try{const e=new URLSearchParams(window.location.search).get("id");let a=e?await m.getById(e):{title:"",description:"",author:""};C({formId:"postForm",defaultValues:a,onSubmit:$})}catch(t){console.log("failed to fetch post detail:",t)}})();