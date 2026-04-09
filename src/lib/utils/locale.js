import en from "$lib/locale/en.json"

export function _(fullKey) {
  const keys = fullKey.split('.');
  return keys.reduce((obj, key) => obj && obj[key], en);
}