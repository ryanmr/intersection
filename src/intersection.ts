interface IntersectionCount<T> {
  [key: string]: { count: number; value: T };
}

interface GetKeyFn<T> {
  (obj: T): string;
}

export function intersection<T>(input: T[][], getKey: GetKeyFn<T>): T[] {
  const merged = input.reduce((a, b) => [...a, ...b], []);

  const intersectionCountMap = merged.reduce((a, b) => {
    const key = getKey(b);
    a[key] = a[key]
      ? { count: a[key].count + 1, value: b }
      : { count: 1, value: b };
    return a;
  }, {} as IntersectionCount<T>);

  const filteredIntersections = Object.entries(intersectionCountMap).filter(
    ([key, { count, value }]) => {
      return count === input.length;
    }
  );

  const intersectionValues = filteredIntersections.map(
    ([key, { count, value }]) => value
  );

  return intersectionValues;
}
