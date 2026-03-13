(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(n){if(n.ep)return;n.ep=!0;const a=r(n);fetch(n.href,a)}})();function q(){const t=(window.location.hash.slice(1)||"/").split("?")[0]||"/",o=(t.startsWith("/")?t.slice(1):t).split("/")[0];return o==="cart"?"cart":o==="delivery"?"delivery":o==="auth"?"auth":""}function y(e){e===""?window.location.hash="/":window.location.hash=`/${e}`}function U(e){e(q()),window.addEventListener("hashchange",()=>e(q()))}let E=null;function h(e){E=e}function j(){return`
    <header class="header">
      <a href="#/" data-link="main">L_Shop</a>
      <nav>
        <a href="#/" data-link="main">Главная</a>
        ${E?`
          <a href="#/cart" data-link="cart">Корзина</a>
          <a href="#/delivery" data-link="delivery">Доставка</a>
          <button type="button" id="btn-logout">Выйти</button>
        `:`
          <a href="#/auth" data-link="auth">Вход / Регистрация</a>
        `}
      </nav>
    </header>
  `}function D(e,t){const r=document.getElementById("btn-logout");r&&r.addEventListener("click",e),document.querySelectorAll("[data-link]").forEach(o=>{o.addEventListener("click",n=>{n.preventDefault();const a=n.currentTarget.getAttribute("data-link");a==="main"?t(""):a==="cart"?t("cart"):a==="delivery"?t("delivery"):a==="auth"&&t("auth")})})}const F="modulepreload",N=function(e){return"/"+e},L={},b=function(t,r,o){let n=Promise.resolve();if(r&&r.length>0){let c=function(d){return Promise.all(d.map(u=>Promise.resolve(u).then(m=>({status:"fulfilled",value:m}),m=>({status:"rejected",reason:m}))))};var l=c;document.getElementsByTagName("link");const i=document.querySelector("meta[property=csp-nonce]"),s=i?.nonce||i?.getAttribute("nonce");n=c(r.map(d=>{if(d=N(d),d in L)return;L[d]=!0;const u=d.endsWith(".css"),m=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${m}`))return;const p=document.createElement("link");if(p.rel=u?"stylesheet":F,u||(p.as="script"),p.crossOrigin="",p.href=d,s&&p.setAttribute("nonce",s),document.head.appendChild(p),u)return new Promise((I,H)=>{p.addEventListener("load",I),p.addEventListener("error",()=>H(new Error(`Unable to preload CSS for ${d}`)))})}))}function a(i){const s=new Event("vite:preloadError",{cancelable:!0});if(s.payload=i,window.dispatchEvent(s),!s.defaultPrevented)throw i}return n.then(i=>{for(const s of i||[])s.status==="rejected"&&a(s.reason);return t().catch(a)})},J="/api";async function f(e,t={}){const r=await fetch(`${J}${e}`,{...t,credentials:"include",headers:{"Content-Type":"application/json",...t.headers}}),o=await r.json();if(!r.ok)throw new Error(o.message??"Request failed");return o}async function _(e){return f("/auth/register",{method:"POST",body:JSON.stringify(e)})}async function C(e){return f("/auth/login",{method:"POST",body:JSON.stringify(e)})}async function O(){return f("/auth/logout",{method:"POST"})}async function v(){return f("/profile")}async function S(e){const t=new URLSearchParams;e.search&&t.set("search",e.search),e.sort&&t.set("sort",e.sort),e.category&&t.set("category",e.category),e.available!==void 0&&t.set("available",e.available);const r=t.toString();return f(`/products${r?`?${r}`:""}`)}async function P(){return f("/cart")}async function B(e,t){return f("/cart/items",{method:"POST",body:JSON.stringify({productId:e,quantity:t})})}async function A(e,t){return f(`/cart/items/${e}`,{method:"PATCH",body:JSON.stringify({quantity:t})})}async function M(e){return f(`/cart/items/${e}`,{method:"DELETE"})}async function R(e){return f("/delivery",{method:"POST",body:JSON.stringify(e)})}const V=Object.freeze(Object.defineProperty({__proto__:null,addToCart:B,createDelivery:R,getCart:P,getProducts:S,getProfile:v,login:C,logout:O,register:_,removeFromCart:M,updateCartItem:A},Symbol.toStringTag,{value:"Module"}));function z(e){const t=E&&e.available;return`
    <div class="product-card" data-product-id="${e.id}">
      <span class="product-name" data-title>${g(e.name)}</span>
      <p class="product-description">${g(e.description)}</p>
      <span class="product-price" data-price>${e.price.toFixed(2)}</span>
      <span class="product-category">${g(e.category)}</span>
      ${e.available?"":'<span class="out-of-stock">Нет в наличии</span>'}
      ${t?`
        <div class="add-to-cart">
          <input type="number" min="1" value="1" data-quantity-input="${e.id}" />
          <button type="button" data-add-cart="${e.id}">В корзину</button>
        </div>
      `:""}
    </div>
  `}function g(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}async function W(e){const t=new URLSearchParams(window.location.hash.slice(1).split("?")[1]||"").get("search")??"",r=new URLSearchParams(window.location.hash.slice(1).split("?")[1]||"").get("sort")??"",o=new URLSearchParams(window.location.hash.slice(1).split("?")[1]||"").get("category")??"",n=new URLSearchParams(window.location.hash.slice(1).split("?")[1]||"").get("available")??"",l=(await S({search:t||void 0,sort:r||void 0,category:o||void 0,available:n||void 0})).data??[];e.innerHTML=`
    <div class="main-page">
      <aside class="filters">
        <h3>Фильтры</h3>
        <label>Поиск <input type="text" id="filter-search" value="${$(t)}" placeholder="имя/описание" /></label>
        <label>Сортировка
          <select id="filter-sort">
            <option value="">—</option>
            <option value="price_asc" ${r==="price_asc"?"selected":""}>Цена по возрастанию</option>
            <option value="price_desc" ${r==="price_desc"?"selected":""}>Цена по убыванию</option>
          </select>
        </label>
        <label>Категория <input type="text" id="filter-category" value="${$(o)}" /></label>
        <label>В наличии <select id="filter-available">
          <option value="">Все</option>
          <option value="true" ${n==="true"?"selected":""}>Да</option>
          <option value="false" ${n==="false"?"selected":""}>Нет</option>
        </select></label>
        <button type="button" id="apply-filters">Применить</button>
      </aside>
      <section class="product-list">
        <h2>Товары</h2>
        <div class="products-grid">
          ${l.map(i=>z(i)).join("")}
        </div>
      </section>
    </div>
  `,K(e),G(e)}function $(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}function K(e){const t=e.querySelector("#apply-filters"),r=e.querySelector("#filter-search"),o=e.querySelector("#filter-sort"),n=e.querySelector("#filter-category"),a=e.querySelector("#filter-available");!t||!r||!o||!n||!a||t.addEventListener("click",()=>{const l=new URLSearchParams;r.value&&l.set("search",r.value),o.value&&l.set("sort",o.value),n.value&&l.set("category",n.value),a.value&&l.set("available",a.value),window.location.hash=`/?${l.toString()}`})}function G(e){e.querySelectorAll("[data-add-cart]").forEach(t=>{const r=t.getAttribute("data-add-cart");if(!r)return;const o=e.querySelector(`[data-quantity-input="${r}"]`);t.addEventListener("click",()=>{const n=o?Math.max(1,parseInt(o.value,10)||1):1;b(async()=>{const{addToCart:a}=await Promise.resolve().then(()=>V);return{addToCart:a}},void 0).then(({addToCart:a})=>a(r,n)),b(()=>Promise.resolve().then(()=>x),void 0).then(a=>a.refreshCart())})})}function Q(e,t){return`
    <tr data-cart-row="${e.id}">
      <td><span data-title="basket">${X(e.name)}</span></td>
      <td><span data-price="basket">${e.price.toFixed(2)}</span></td>
      <td>
        <input type="number" min="1" value="${t}" data-cart-qty="${e.id}" />
        <button type="button" data-cart-remove="${e.id}">Удалить</button>
      </td>
    </tr>
  `}function X(e){const t=document.createElement("div");return t.textContent=e,t.innerHTML}async function w(e){const r=(await P()).data??[],o=new Map,a=(await S({})).data??[];for(const i of a)o.set(i.id,i);const l=r.map(i=>{const s=o.get(i.productId);return s?Q(s,i.quantity):""}).join("");if(e.innerHTML=`
    <div class="cart-page">
      <h2>Корзина</h2>
      ${r.length===0?"<p>Корзина пуста</p>":`
        <table>
          <thead><tr><th>Товар</th><th>Цена</th><th>Кол-во / Действия</th></tr></thead>
          <tbody>${l}</tbody>
        </table>
        <button type="button" id="btn-to-delivery">Оформить доставку</button>
      `}
    </div>
  `,r.length>0){const i=document.getElementById("btn-to-delivery");i&&i.addEventListener("click",()=>y("delivery")),e.querySelectorAll("[data-cart-qty]").forEach(s=>{const c=s.getAttribute("data-cart-qty");c&&s.addEventListener("change",()=>{const d=Math.max(1,parseInt(s.value,10)||1);A(c,d).then(()=>w(e))})}),e.querySelectorAll("[data-cart-remove]").forEach(s=>{const c=s.getAttribute("data-cart-remove");c&&s.addEventListener("click",()=>{M(c).then(()=>w(e))})})}}function Y(e){e.innerHTML=`
    <div class="delivery-page">
      <h2>Оформление доставки</h2>
      <form data-delivery id="delivery-form">
        <label>Адрес <input type="text" name="address" required /></label>
        <label>Телефон <input type="text" name="phone" required /></label>
        <label>Почта <input type="email" name="email" required /></label>
        <label>Оплата <select name="payment" required>
          <option value="">Выберите</option>
          <option value="card">Картой</option>
          <option value="cash">Наличные</option>
          <option value="online">Онлайн</option>
        </select></label>
        <button type="submit">Оформить</button>
      </form>
      <div id="delivery-message"></div>
    </div>
  `;const t=e.querySelector("#delivery-form"),r=e.querySelector("#delivery-message");!t||!r||t.addEventListener("submit",async o=>{o.preventDefault();const n=new FormData(t),a=n.get("address")??"",l=n.get("phone")??"",i=n.get("email")??"",s=n.get("payment")??"";try{await R({address:a,phone:l,email:i,payment:s}),r.textContent="Доставка оформлена. Корзина очищена.",t.reset(),b(()=>Promise.resolve().then(()=>x),void 0).then(c=>c.refreshCart()),setTimeout(()=>y(""),2e3)}catch(c){r.textContent=c instanceof Error?c.message:"Ошибка"}})}function Z(e){e.innerHTML=`
    <div class="auth-page">
      <h2>Вход / Регистрация</h2>
      <form data-registration id="auth-form">
        <fieldset>
          <legend>Регистрация</legend>
          <label>Имя <input type="text" name="name" /></label>
          <label>Email <input type="email" name="email" /></label>
          <label>Логин <input type="text" name="login" /></label>
          <label>Телефон <input type="text" name="phone" /></label>
          <label>Пароль <input type="password" name="password" /></label>
          <button type="button" id="btn-register">Зарегистрироваться</button>
        </fieldset>
      </form>
      <form id="login-form">
        <fieldset>
          <legend>Вход</legend>
          <label>Email <input type="text" name="email" id="login-email" /></label>
          <label>Пароль <input type="password" name="password" id="login-password" /></label>
          <button type="button" id="btn-login">Войти</button>
        </fieldset>
      </form>
      <div id="auth-message"></div>
    </div>
  `;const t=e.querySelector("#auth-form"),r=e.querySelector("#login-form"),o=e.querySelector("#auth-message");if(!t||!r||!o)return;const n=a=>{o.textContent=a};e.querySelector("#btn-register")?.addEventListener("click",async()=>{const a=new FormData(t),l=a.get("name")?.trim()??"",i=a.get("email")?.trim()??"",s=a.get("login")?.trim()??"",c=a.get("phone")?.trim()??"",d=a.get("password")??"";if(!l||!i||!s||!c||!d){n("Заполните все поля регистрации.");return}try{await _({name:l,email:i,login:s,phone:c,password:d}),n("Регистрация успешна. Вы вошли (кука на 10 мин).");const u=await v();u.data&&h(u.data),setTimeout(()=>window.location.reload(),1e3)}catch(u){n(u instanceof Error?u.message:"Ошибка регистрации")}}),e.querySelector("#btn-login")?.addEventListener("click",async()=>{const a=(e.querySelector("#login-email")?.value??"").trim(),l=e.querySelector("#login-password")?.value??"";if(!a||!l){n("Введите email и пароль.");return}try{await C({email:a,password:l}),n("Вход выполнен.");const i=await v();i.data&&h(i.data),setTimeout(()=>window.location.reload(),1e3)}catch(i){n(i instanceof Error?i.message:"Ошибка входа")}})}const T=document.querySelector("#app");async function k(){try{const e=await P();e.data}catch{}}async function ee(){try{const e=await v();e.data?h(e.data):h(null)}catch{h(null)}}async function te(){await ee(),await k();const e=T.querySelector("#header"),t=T.querySelector("#content");if(!e||!t)throw new Error("Missing #header or #content");async function r(o){e.innerHTML=j(),D(async()=>{await O(),h(null),y("")},n=>y(n)),t.innerHTML="<p>Загрузка…</p>",o==="cart"?await w(t):o==="delivery"?Y(t):o==="auth"?Z(t):await W(t)}U(o=>r(o))}te();const x=Object.freeze(Object.defineProperty({__proto__:null,refreshCart:k},Symbol.toStringTag,{value:"Module"}));
