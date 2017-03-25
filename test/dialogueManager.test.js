const DialogueManager = require("../dialogueManager");

test("creates a new DialogueManager object", () => {
  const d = new DialogueManager(/* Game */);
  expect(d instanceof DialogueManager);
  expect(d).toBeDefined();
});
