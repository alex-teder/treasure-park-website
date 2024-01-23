export function findLast<T>(
  arr: Array<T>,
  predicate: (element: T, index: number) => boolean
): T | undefined {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i], i)) {
      return arr[i];
    }
  }
  return undefined;
}

export function findLastIndex<T>(
  arr: Array<T>,
  predicate: (element: T, index: number) => boolean
): number | undefined {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i], i)) {
      return i;
    }
  }
  return undefined;
}
