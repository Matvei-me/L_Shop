import { getCart } from "../api";
import { getProducts } from "../api";
import { setCartItems } from "../state";
import { renderCartItemRow } from "../components/CartItemRow";
import { updateCartItem, removeFromCart } from "../api";
import { navigateTo } from "../router";
import type { Product } from "../types";

export async function renderCartPage(container: HTMLElement): Promise<void> {
  const cartRes = await getCart();
  const items = cartRes.data ?? [];
  setCartItems(items);

  const productsMap = new Map<string, Product>();
  const productsRes = await getProducts({});
  const allProducts = productsRes.data ?? [];
  for (const p of allProducts) {
    productsMap.set(p.id, p);
  }

  const rows = items
    .map((item) => {
      const product = productsMap.get(item.productId);
      if (!product) return "";
      return renderCartItemRow(product, item.quantity);
    })
    .join("");

  container.innerHTML = `
    <div class="cart-page">
      <h2>Корзина</h2>
      ${items.length === 0 ? "<p>Тут пока пусто</p>" : `
        <table>
          <thead><tr><th>Товар</th><th>Цена</th><th>Кол-во / Действия</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
        <button type="button" id="btn-to-delivery">Оформить доставку</button>
      `}
    </div>
  `;

  if (items.length > 0) {
    const btn = document.getElementById("btn-to-delivery");
    if (btn) btn.addEventListener("click", () => navigateTo("delivery"));

    container.querySelectorAll("[data-cart-qty]").forEach((input) => {
      const productId = (input as HTMLElement).getAttribute("data-cart-qty");
      if (!productId) return;
      input.addEventListener("change", () => {
        const qty = Math.max(1, parseInt((input as HTMLInputElement).value, 10) || 1);
        updateCartItem(productId, qty).then(() => renderCartPage(container));
      });
    });

    container.querySelectorAll("[data-cart-remove]").forEach((btn) => {
      const productId = (btn as HTMLElement).getAttribute("data-cart-remove");
      if (!productId) return;
      btn.addEventListener("click", () => {
        removeFromCart(productId).then(() => renderCartPage(container));
      });
    });
  }
}
