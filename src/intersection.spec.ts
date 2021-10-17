import { intersection } from "./intersection";

describe("intersection", () => {
  test("basic, with number", () => {
    const input = [
      [1, 9],
      [1, 2, 9],
      [1, 3, 9],
      [1, 3, 9],
    ];
    const result = intersection(input, (a) => a.toString());
    expect(result).toEqual(expect.arrayContaining([1, 9]));
  });
  test("basic, no matches", () => {
    const input = [[1, 9], [9], [1, 3, 9], [1, 3]];
    const result = intersection(input, (a) => a.toString());
    expect(result).toEqual([]);
  });
  test("complex, 1 match", () => {
    const input = [
      [{ id: "id-1" }, { id: "id-2" }, { id: "id-3" }],
      [{ id: "id-1" }, { id: "id-4" }, { id: "id-5" }],
      [{ id: "id-1" }, { id: "id-6" }, { id: "id-7" }],
      [{ id: "id-1" }, { id: "id-8" }, { id: "id-9" }],
    ];
    const result = intersection(input, (a) => a.id);
    expect(result).toEqual(expect.arrayContaining([{ id: "id-1" }]));
  });
  test("complex, single line should not match", () => {
    const input = [
      [{ id: "id-1" }, { id: "id-1" }, { id: "id-1" }, { id: "id-1" }],
      [{ id: "id-10" }, { id: "id-4" }, { id: "id-5" }],
      [{ id: "id-100" }, { id: "id-6" }, { id: "id-7" }],
      [{ id: "id-1000" }, { id: "id-8" }, { id: "id-9" }],
    ];
    const result = intersection(input, (a) => a.id);
    expect(result).toEqual([]);
  });
});
