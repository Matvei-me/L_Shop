import "./style.css";
import { initRouter, navigateTo } from "./router";
import type { Route } from "./router";
import { renderHeader, bindHeaderEvents } from "./components/Header";
import { renderMainPage } from "./pages/MainPage";
import { renderCartPage } from "./pages/CartPage";
import { renderDeliveryPage } from "./pages/DeliveryPage";
import { renderAuthPage } from "./pages/AuthPage";
import { getProfile } from "./api";
import { getCart } from "./api";
import { setCurrentUser, setCartItems } from "./state";
import { logout } from "./api";

const appEl = document.querySelector<HTMLDivElement>("#app")!;

export async function refreshCart() {
  try {
    const res = await getCart();
    setCartItems(res.data || []);
  } catch {
    setCartItems([]);
  }
}

async function loadUser() {
  try {
    const res = await getProfile();
    setCurrentUser(res.data || null);
  } catch {
    setCurrentUser(null);
  }
}

async function init(): Promise<void> {
  await loadUser();
  await refreshCart();

  const headerEl = appEl.querySelector<HTMLDivElement>("#header")!;
  const contentEl = appEl.querySelector<HTMLDivElement>("#content")!;
  if (!headerEl || !contentEl) throw new Error("Missing #header or #content");

  async function render(route: Route) {
    headerEl.innerHTML = renderHeader();
    bindHeaderEvents(async () => {
      await logout();
      setCurrentUser(null);
      setCartItems([]);
      navigateTo("");
    }, (r) => navigateTo(r));

    contentEl.innerHTML = "<p>Гружу...</p>";

    if (route === "cart") {
      await renderCartPage(contentEl);
    } else if (route === "delivery") {
      renderDeliveryPage(contentEl);
    } else if (route === "auth") {
      renderAuthPage(contentEl);
    } else {
      await renderMainPage(contentEl);
    }
  }

  initRouter((route) => render(route));
}

init();
