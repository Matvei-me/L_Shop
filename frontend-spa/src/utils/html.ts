/**
 * экранирование для вставки текста в HTML (чтобы при странных символах не ломалась разметка)
 * @param {string} value сырая строка
 * @returns {string} строка для безопасной подстановки в innerHTML
 */
export function escapeHtml(value: string): string {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

/**
 * то же для атрибутов value="" в шаблонных строках
 * @param {string} value сырая строка
 * @returns {string}
 */
export function escapeAttr(value: string): string {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}
