interface IntersectionMap<T> {
  [key: string]: { seen: number[]; intersection: null | boolean; value: T };
}

interface GetKeyFn<T> {
  (obj: T): string;
}

export function intersection<T>(input: T[][], getKey: GetKeyFn<T>): T[] {
  let intersectionMap: IntersectionMap<T> = {};

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const element = input[i][j];
      const key = getKey(element);
      if (!intersectionMap[key]) {
        intersectionMap[key] = { seen: [], intersection: null, value: element };
      }

      intersectionMap[key].seen.push(i);
    }
  }

  const entries = Object.entries(intersectionMap);

  entries.forEach(([key, value]) => {
    let appearence = 0;
    for (let i = 0; i < input.length; i++) {
      if (value.seen.includes(i)) {
        appearence++;
      }
    }
    const intersection = appearence === input.length;
    value.intersection = intersection;
  });

  let elements: T[] = [];

  entries.forEach(([key, element]) => {
    if (element.intersection) {
      const { value } = element;
      elements.push(value);
    }
  });

  return elements;
}
