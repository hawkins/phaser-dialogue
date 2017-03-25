const Dialogue = require("../dialogue");

test("creates a new Dialogue object", () => {
  const d = new Dialogue("Test");
  expect(d instanceof Dialogue);
  expect(d).toBeDefined();
});

test("attaches string dialogue", () => {
  expect(new Dialogue("Test").texts).toEqual(["Test"]);
});

test("attaches array dialogue", () => {
  expect(new Dialogue(["a", "b"]).texts).toEqual(["a", "b"]);
});

test("returns a generator", () => {
  const d = new Dialogue("test");
  const generator = d.generate();
  expect(typeof generator).toBe("function");
});

test("generator eventually returns full text", () => {
  const testString = "test";
  const d = new Dialogue(testString);
  const generator = d.generate();
  var string = generator();
  var last = "";
  while (string !== last) {
    last = string;
    string = generator();
  }
});

test("selects next text", () => {
  const testStrings = ["test1", "test2"];
  const d = new Dialogue(testStrings);
  const first = d.text;
  d.next();
  const second = d.text;
  expect(first).not.toBe(second);
});

test("selects previous text", () => {
  const testStrings = ["test1", "test2"];
  const d = new Dialogue(testStrings);
  const first = d.text;
  d.previous();
  const second = d.text;
  expect(second).toBeDefined();
  expect(first).not.toBe(second);
});
