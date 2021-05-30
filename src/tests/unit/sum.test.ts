const sum = (a: number, b: number): number => {
  return a + b;
};

// sample sum unit test
test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
