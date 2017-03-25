function DialogueManager(game, textElement) {
  "use strict";
  this.game = game;
  this.textElement = textElement;
}

DialogueManager.prototype.load = function(dialogue) {
  if (dialogue instanceof Dialogue) {
    this.dialogue = dialogue;
    this.selectText();
  }
};

DialogueManager.prototype.selectText = function() {
  this.generator = this.dialogue.generate();
};

DialogueManager.prototype.next = function() {
  const text = this.dialogue.next();
  this.selectText();
};

DialogueManager.prototype.previous = function() {
  this.dialogue.previous();
  this.selectText();
};

DialogueManager.prototype.start = function() {
  // TODO: Start playing through the entire dialogue
};

DialogueManager.prototype.updateLine = function() {
  this.textElement.setText(this.generator());
};

try {
  module.exports = DialogueManager;
} catch (err) {
  window.DialogueManager = DialogueManager;
}
