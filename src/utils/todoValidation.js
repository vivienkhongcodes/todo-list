export function isValidTodoTitle(title) {
  return title.trim() !== '' && title.trim().length <= 100;
}