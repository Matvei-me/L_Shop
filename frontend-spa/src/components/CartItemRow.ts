import type { Product } from "../types";

export function renderCartItemRow(
  product: Product,
  quantity: number
): string {
  return `
    <tr data-cart-row="${product.id}">
      <td><span data-title="basket">${escapeHtml(product.name)}</span></td>
      <td><span data-price="basket">${product.price.toFixed(2)}</span></td>
      <td>
        <input type="number" min="1" value="${quantity}" data-cart-qty="${product.id}" />
        <button type="button" data-cart-remove="${product.id}">Удалить</button>
      </td>
    </tr>
  `;
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}
