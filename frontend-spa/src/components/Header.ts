import { currentUser } from "../state";
import type { Route } from "../router";

export function renderHeader(): string {
  const user = currentUser;
  return `
    <header class="header">
      <a href="#/" data-link="main">L_Shop</a>
      <nav>
        <a href="#/" data-link="main">Главная</a>
        ${user ? `
          <a href="#/cart" data-link="cart">Корзина</a>
          <a href="#/delivery" data-link="delivery">Доставка</a>
          <button type="button" id="btn-logout">Выйти</button>
        ` : `
          <a href="#/auth" data-link="auth">Вход / Регистрация</a>
        `}
      </nav>
    </header>
  `;
}

export function bindHeaderEvents(
  onLogout: () => void,
  onNavigate: (route: Route) => void
): void {
  const btn = document.getElementById("btn-logout");
  if (btn) {
    btn.addEventListener("click", onLogout);
  }
  document.querySelectorAll("[data-link]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const link = (e.currentTarget as HTMLElement).getAttribute("data-link");
      if (link === "main") onNavigate("");
      else if (link === "cart") onNavigate("cart");
      else if (link === "delivery") onNavigate("delivery");
      else if (link === "auth") onNavigate("auth");
    });
  });
}
