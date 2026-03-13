import { createDelivery } from "../api";
import { navigateTo } from "../router";

export function renderDeliveryPage(container: HTMLElement) {
  container.innerHTML = `
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
  `;

  const form = container.querySelector<HTMLFormElement>("#delivery-form");
  const messageEl = container.querySelector("#delivery-message");
  if (!form || !messageEl) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const address = (fd.get("address") as string) ?? "";
    const phone = (fd.get("phone") as string) ?? "";
    const email = (fd.get("email") as string) ?? "";
    const payment = (fd.get("payment") as string) ?? "";
    try {
      await createDelivery({ address, phone, email, payment });
      messageEl.textContent = "Готово, заказ оформили. Корзину почистило.";
      form.reset();
      import("../main").then((m) => m.refreshCart());
      setTimeout(() => navigateTo(""), 2000);
    } catch (err) {
      messageEl.textContent = err instanceof Error ? err.message : "не отправилось";
    }
  });
}
