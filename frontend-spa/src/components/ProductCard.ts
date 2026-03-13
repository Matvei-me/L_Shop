import type { Product } from "../types";
import { currentUser } from "../state";

export function renderProductCard(product: Product): string {
  const canAdd = currentUser && product.available;
  return `
    <div class="product-card" data-product-id="${product.id}">
      <span class="product-name" data-title>${escapeHtml(product.name)}</span>
      <p class="product-description">${escapeHtml(product.description)}</p>
      <span class="product-price" data-price>${product.price.toFixed(2)}</span>
      <span class="product-category">${escapeHtml(product.category)}</span>
      ${!product.available ? '<span class="out-of-stock">Нет в наличии</span>' : ""}
      ${canAdd ? `
        <div class="add-to-cart">
          <input type="number" min="1" value="1" data-quantity-input="${product.id}" />
          <button type="button" data-add-cart="${product.id}">В корзину</button>
        </div>
      ` : ""}
    </div>
  `;
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}
