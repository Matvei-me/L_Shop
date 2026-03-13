import { getProducts } from "../api";
import { setProductsCache } from "../state";
import { renderProductCard } from "../components/ProductCard";

export async function renderMainPage(container: HTMLElement): Promise<void> {
  const search = new URLSearchParams(window.location.hash.slice(1).split("?")[1] || "").get("search") ?? "";
  const sort = new URLSearchParams(window.location.hash.slice(1).split("?")[1] || "").get("sort") ?? "";
  const category = new URLSearchParams(window.location.hash.slice(1).split("?")[1] || "").get("category") ?? "";
  const available = new URLSearchParams(window.location.hash.slice(1).split("?")[1] || "").get("available") ?? "";

  const res = await getProducts({
    search: search || undefined,
    sort: sort || undefined,
    category: category || undefined,
    available: available || undefined,
  });

  const products = res.data ?? [];
  setProductsCache(products);

  container.innerHTML = `
    <div class="main-page">
      <aside class="filters">
        <h3>Фильтры</h3>
        <label>Поиск <input type="text" id="filter-search" value="${escapeAttr(search)}" placeholder="имя/описание" /></label>
        <label>Сортировка
          <select id="filter-sort">
            <option value="">—</option>
            <option value="price_asc" ${sort === "price_asc" ? "selected" : ""}>Цена по возрастанию</option>
            <option value="price_desc" ${sort === "price_desc" ? "selected" : ""}>Цена по убыванию</option>
          </select>
        </label>
        <label>Категория <input type="text" id="filter-category" value="${escapeAttr(category)}" /></label>
        <label>В наличии <select id="filter-available">
          <option value="">Все</option>
          <option value="true" ${available === "true" ? "selected" : ""}>Да</option>
          <option value="false" ${available === "false" ? "selected" : ""}>Нет</option>
        </select></label>
        <button type="button" id="apply-filters">Показать</button>
      </aside>
      <section class="product-list">
        <h2>Товары</h2>
        <div class="products-grid">
          ${products.map((p) => renderProductCard(p)).join("")}
        </div>
      </section>
    </div>
  `;

  bindFilters(container);
  bindAddToCart(container);
}

function escapeAttr(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}

function bindFilters(container: HTMLElement): void {
  const btn = container.querySelector("#apply-filters");
  const search = container.querySelector<HTMLInputElement>("#filter-search");
  const sort = container.querySelector<HTMLSelectElement>("#filter-sort");
  const category = container.querySelector<HTMLInputElement>("#filter-category");
  const available = container.querySelector<HTMLSelectElement>("#filter-available");

  if (!btn || !search || !sort || !category || !available) return;

  btn.addEventListener("click", () => {
    const params = new URLSearchParams();
    if (search.value) params.set("search", search.value);
    if (sort.value) params.set("sort", sort.value);
    if (category.value) params.set("category", category.value);
    if (available.value) params.set("available", available.value);
    window.location.hash = `/?${params.toString()}`;
  });
}

function bindAddToCart(container: HTMLElement): void {
  container.querySelectorAll("[data-add-cart]").forEach((btn) => {
    const productId = (btn as HTMLElement).getAttribute("data-add-cart");
    if (!productId) return;
    const input = container.querySelector<HTMLInputElement>(`[data-quantity-input="${productId}"]`);
    btn.addEventListener("click", () => {
      const qty = input ? Math.max(1, parseInt(input.value, 10) || 1) : 1;
      import("../api").then(({ addToCart }) => addToCart(productId, qty));
      import("../main").then((m) => m.refreshCart());
    });
  });
}
