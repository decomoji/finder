/**
 * History API の replaceState() を実行する
 * @param param
 */
export const replaceState = (param: string) => {
  window.history.replaceState({}, "", "?" + param);
};
