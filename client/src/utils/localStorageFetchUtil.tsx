export const localStorageJsonParse = (item: string) => {
  return JSON.parse(localStorage.getItem(item) as string) || null;
};
