var game = new Phaser.Game(640, 480, Phaser.AUTO, "root", {
  create: create,
  update: update
});

const dialogue = [ "This is the first line", "This is the second line" ];

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
  nextLine();

  // Get cursors from game
  cursors = game.input.keyboard.createCursorKeys();
}

function update() {
  // Example controls
  if (cursors.right.isDown) {
    // Select next dialogue
    nextLine();
  }
  if (cursors.left.isDown) {
    // Select previous dialogue
    lineIndex = -1;
    nextLine();
  }
}

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
