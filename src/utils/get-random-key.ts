export function getRandomKey<T>(keys: T[]) {
  return keys[Math.floor(Math.random() * keys.length)];
}
