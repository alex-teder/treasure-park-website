export function getRandomNumber(length: number = 10): number {
  const array = new Uint32Array(Math.ceil(length / 4));
  crypto.getRandomValues(array);
  const numeric = Array.from(array, (num) => num.toString(10).padStart(10, "0"))
    .join("")
    .slice(0, length);
  return parseInt(numeric);
}
