var game = new Phaser.Game(640, 480, Phaser.AUTO, "root", {
  create: create,
  update: update
});

var dialogue;
var dialogueManager;

var cursors;
var text;
var lineIndex = -1;
var line = "";

function create() {
  // Dialogue text
  text = game.add.text(game.world.centerX, game.world.centerY, "", {
    font: "bold 60px",
    fill: "#ecf0f1",
    align: "center"
  });
  text.anchor.setTo(0.5);

  // Create dialogue manager
  dialogueManager = new DialogueManager(game, text);

  // Load dialogue
  dialogue = new Dialogue([ "This is the first line", "This is the second line" ]);
  dialogueManager.load(dialogue);

  // Update the text on screen
  dialogueManager.updateLine();

  // Get cursors from game
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  // Example controls
  if (cursors.up.isDown) {
    // Update the text
    dialogueManager.updateLine();
  }
  if (cursors.right.isDown) {
    // Select next dialogue
    dialogueManager.next();
  }
  if (cursors.left.isDown) {
    // Select previous dialogue
    dialogueManager.previous();
  }
}

/*
 * TODO: Implement these following functions in the library
 */

function nextLine() {
  lineIndex++;

  if (lineIndex < dialogue.length) {
    line = "";
    game.time.events.repeat(
      50,
      dialogue[lineIndex].length + 1,
      updateLine,
      this
    );
  }
}

function updateLine() {
  if (dialogue[lineIndex] && line.length < dialogue[lineIndex].length) {
    line = dialogue[lineIndex].substr(0, line.length + 1);
    text.setText(line);
  } else {
    game.time.events.add(Phaser.Timer.SECOND * 2, nextLine, this);
  }
}
