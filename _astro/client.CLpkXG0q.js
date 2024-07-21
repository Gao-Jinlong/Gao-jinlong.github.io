import{i as L,a as h,c as z,b as B,e as $,d as q,f as G,g as O,h as P,j as W,k as F,l as R,m as K,n as U,o as X,p as y,q as p,S as J}from"./runtime-core.esm-bundler.CChL7F_q.js";const H=e=>{},Q=Object.freeze(Object.defineProperty({__proto__:null,default:H},Symbol.toStringTag,{value:"Module"}));/**
* @vue/runtime-dom v3.4.31
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/const V="http://www.w3.org/2000/svg",Y="http://www.w3.org/1998/Math/MathML",u=typeof document<"u"?document:null,b=u&&u.createElement("template"),Z={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,i)=>{const s=t==="svg"?u.createElementNS(V,e):t==="mathml"?u.createElementNS(Y,e):n?u.createElement(e,{is:n}):u.createElement(e);return e==="select"&&i&&i.multiple!=null&&s.setAttribute("multiple",i.multiple),s},createText:e=>u.createTextNode(e),createComment:e=>u.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>u.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,i,s,o){const r=n?n.previousSibling:t.lastChild;if(s&&(s===o||s.nextSibling))for(;t.insertBefore(s.cloneNode(!0),n),!(s===o||!(s=s.nextSibling)););else{b.innerHTML=i==="svg"?`<svg>${e}</svg>`:i==="mathml"?`<math>${e}</math>`:e;const c=b.content;if(i==="svg"||i==="mathml"){const f=c.firstChild;for(;f.firstChild;)c.appendChild(f.firstChild);c.removeChild(f)}t.insertBefore(c,n)}return[r?r.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},k=Symbol("_vtc");function tt(e,t,n){const i=e[k];i&&(t=(t?[t,...i]:[...i]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const A=Symbol("_vod"),et=Symbol("_vsh"),nt=Symbol(""),it=/(^|;)\s*display\s*:/;function st(e,t,n){const i=e.style,s=h(n);let o=!1;if(n&&!s){if(t)if(h(t))for(const r of t.split(";")){const c=r.slice(0,r.indexOf(":")).trim();n[c]==null&&m(i,c,"")}else for(const r in t)n[r]==null&&m(i,r,"");for(const r in n)r==="display"&&(o=!0),m(i,r,n[r])}else if(s){if(t!==n){const r=i[nt];r&&(n+=";"+r),i.cssText=n,o=it.test(n)}}else t&&e.removeAttribute("style");A in e&&(e[A]=o?i.display:"",e[et]&&(i.display="none"))}const v=/\s*!important$/;function m(e,t,n){if(O(n))n.forEach(i=>m(e,t,i));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const i=rt(e,t);v.test(n)?e.setProperty(P(i),n.replace(v,""),"important"):e[i]=n}}const E=["Webkit","Moz","ms"],S={};function rt(e,t){const n=S[t];if(n)return n;let i=W(t);if(i!=="filter"&&i in e)return S[t]=i;i=F(i);for(let s=0;s<E.length;s++){const o=E[s]+i;if(o in e)return S[t]=o}return t}const C="http://www.w3.org/1999/xlink";function _(e,t,n,i,s,o=U(t)){i&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(C,t.slice(6,t.length)):e.setAttributeNS(C,t,n):n==null||o&&!R(n)?e.removeAttribute(t):e.setAttribute(t,o?"":K(n)?String(n):n)}function ot(e,t,n,i,s,o,r){if(t==="innerHTML"||t==="textContent"){i&&r(i,s,o),e[t]=n??"";return}const c=e.tagName;if(t==="value"&&c!=="PROGRESS"&&!c.includes("-")){const l=c==="OPTION"?e.getAttribute("value")||"":e.value,a=n==null?"":String(n);(l!==a||!("_value"in e))&&(e.value=a),n==null&&e.removeAttribute(t),e._value=n;return}let f=!1;if(n===""||n==null){const l=typeof e[t];l==="boolean"?n=R(n):n==null&&l==="string"?(n="",f=!0):l==="number"&&(n=0,f=!0)}try{e[t]=n}catch{}f&&e.removeAttribute(t)}function ct(e,t,n,i){e.addEventListener(t,n,i)}function lt(e,t,n,i){e.removeEventListener(t,n,i)}const w=Symbol("_vei");function ft(e,t,n,i,s=null){const o=e[w]||(e[w]={}),r=o[t];if(i&&r)r.value=i;else{const[c,f]=at(t);if(i){const l=o[t]=pt(i,s);ct(e,c,l,f)}else r&&(lt(e,c,r,f),o[t]=void 0)}}const N=/(?:Once|Passive|Capture)$/;function at(e){let t;if(N.test(e)){t={};let i;for(;i=e.match(N);)e=e.slice(0,e.length-i[0].length),t[i[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):P(e.slice(2)),t]}let g=0;const ut=Promise.resolve(),dt=()=>g||(ut.then(()=>g=0),g=Date.now());function pt(e,t){const n=i=>{if(!i._vts)i._vts=Date.now();else if(i._vts<=n.attached)return;X(mt(i,n.value),t,5,[i])};return n.value=e,n.attached=dt(),n}function mt(e,t){if(O(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(i=>s=>!s._stopped&&i&&i(s))}else return t}const M=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,ht=(e,t,n,i,s,o,r,c,f)=>{const l=s==="svg";t==="class"?tt(e,i,l):t==="style"?st(e,n,i):q(t)?G(t)||ft(e,t,n,i,r):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):St(e,t,i,l))?(ot(e,t,i,o,r,c,f),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&_(e,t,i,l,r,t!=="value")):(t==="true-value"?e._trueValue=i:t==="false-value"&&(e._falseValue=i),_(e,t,i,l))};function St(e,t,n,i){if(i)return!!(t==="innerHTML"||t==="textContent"||t in e&&M(t)&&L(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const s=e.tagName;if(s==="IMG"||s==="VIDEO"||s==="CANVAS"||s==="SOURCE")return!1}return M(t)&&h(n)?!1:t in e}const I=$({patchProp:ht},Z);let d,T=!1;function gt(){return d||(d=z(I))}function bt(){return d=T?d:B(I),T=!0,d}const At=(...e)=>{const t=gt().createApp(...e),{mount:n}=t;return t.mount=i=>{const s=D(i);if(!s)return;const o=t._component;!L(o)&&!o.render&&!o.template&&(o.template=s.innerHTML),s.innerHTML="";const r=n(s,!1,x(s));return s instanceof Element&&(s.removeAttribute("v-cloak"),s.setAttribute("data-v-app","")),r},t},vt=(...e)=>{const t=bt().createApp(...e),{mount:n}=t;return t.mount=i=>{const s=D(i);if(s)return n(s,!0,x(s))},t};function x(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function D(e){return h(e)?document.querySelector(e):e}const Et=async e=>{"default"in Q&&await H()},Ct=y({props:{value:String,name:String,hydrate:{type:Boolean,default:!0}},setup({name:e,value:t,hydrate:n}){if(!t)return()=>null;let i=n?"astro-slot":"astro-static-slot";return()=>p(i,{name:e,innerHTML:t})}}),Nt=e=>async(t,n,i,{client:s})=>{if(!e.hasAttribute("ssr"))return;const o=t.name?`${t.name} Host`:void 0,r={};for(const[a,j]of Object.entries(i))r[a]=()=>p(Ct,{value:j,name:a==="default"?void 0:a});const c=s!=="only",l=(c?vt:At)({name:o,render(){let a=p(t,n,r);return _t(t.setup)&&(a=p(J,null,a)),a}});await Et(),l.mount(e,c),e.addEventListener("astro:unmount",()=>l.unmount(),{once:!0})};function _t(e){const t=e?.constructor;return t&&t.name==="AsyncFunction"}export{Nt as default};
