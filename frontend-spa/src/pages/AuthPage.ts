import { register, login } from "../api";
import { getProfile } from "../api";
import { setCurrentUser } from "../state";

export function renderAuthPage(container: HTMLElement) {
  container.innerHTML = `
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
  `;

  const authForm = container.querySelector<HTMLFormElement>("#auth-form");
  const loginForm = container.querySelector<HTMLFormElement>("#login-form");
  const msgEl = container.querySelector("#auth-message");
  if (!authForm || !loginForm || !msgEl) return;

  const setMsg = (s: string) => {
    msgEl.textContent = s;
  };

  container.querySelector("#btn-register")?.addEventListener("click", async () => {
    const fd = new FormData(authForm);
    const name = (fd.get("name") as string)?.trim() ?? "";
    const email = (fd.get("email") as string)?.trim() ?? "";
    const loginVal = (fd.get("login") as string)?.trim() ?? "";
    const phone = (fd.get("phone") as string)?.trim() ?? "";
    const password = (fd.get("password") as string) ?? "";
    if (!name || !email || !loginVal || !phone || !password) {
      setMsg("Нужно заполнить все поля.");
      return;
    }
    try {
      await register({ name, email, login: loginVal, phone, password });
      setMsg("Ок, залогинило. Перезагружаю...");
      const profileRes = await getProfile();
      if (profileRes.data) setCurrentUser(profileRes.data);
      setTimeout(() => window.location.reload(), 1000);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "не вышло");
    }
  });

  container.querySelector("#btn-login")?.addEventListener("click", async () => {
    const email = (container.querySelector<HTMLInputElement>("#login-email")?.value ?? "").trim();
    const password = container.querySelector<HTMLInputElement>("#login-password")?.value ?? "";
    if (!email || !password) {
      setMsg("Напиши email и пароль");
      return;
    }
    try {
      await login({ email, password });
      setMsg("Залогинило, ща обновлю страницу");
      const profileRes = await getProfile();
      if (profileRes.data) setCurrentUser(profileRes.data);
      setTimeout(() => window.location.reload(), 1000);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "не зашло");
    }
  });
}
