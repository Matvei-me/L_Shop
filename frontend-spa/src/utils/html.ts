/**
 * @param value произвольная строка
 * @returns экранированная строка для вставки в HTML
 */
export function escapeHtml(value: string): string {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

/**
 * @param value значение для подстановки в HTML-атрибут
 * @returns экранированная строка
 */
export function escapeAttr(value: string): string {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}
