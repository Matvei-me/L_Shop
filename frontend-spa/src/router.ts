export type Route = "" | "cart" | "delivery" | "auth";

export function getRoute(): Route {
  const hash = window.location.hash.slice(1) || "/";
  const pathname = hash.split("?")[0] || "/";
  const path = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  const segment = path.split("/")[0];
  if (segment === "cart") return "cart";
  if (segment === "delivery") return "delivery";
  if (segment === "auth") return "auth";
  return "";
}

export function navigateTo(route: Route): void {
  if (route === "") {
    window.location.hash = "/";
  } else {
    window.location.hash = `/${route}`;
  }
}

export function initRouter(onRoute: (route: Route) => void): void {
  onRoute(getRoute());
  window.addEventListener("hashchange", () => onRoute(getRoute()));
}
