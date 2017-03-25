function Dialogue(texts) {
  "use strict";
  if (typeof texts === "string") {
    this.texts = [ texts ];
  } else if (
    typeof texts === "object" &&
      Object.prototype.toString.call(texts) === "[object Array]"
  ) {
    this.texts = texts;
  }

  this.index = 0;
  this.text = this.texts[this.index];
}

Dialogue.prototype.next = function() {
  this.index++;
  if (this.index >= this.texts.length) {
    this.index = 0;
  }
  this.text = this.texts[this.index];
};

Dialogue.prototype.previous = function() {
  this.index--;
  if (this.index < 0) {
    this.index = this.texts.length + this.index;
  }
  this.text = this.texts[this.index];
};

Dialogue.prototype.generate = function() {
  var index = 0;
  var text = this.text;
  var iterator = function() {
    index++;
    return text.substr(0, index);
  };
  return iterator;
};

try {
  module.exports = Dialogue;
} catch (err) {
  window.Dialogue = Dialogue;
}
