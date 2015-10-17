const sounds = {
  error: new Audio(require("./sounds/error.mp3")),
  crunch: new Audio(require("./sounds/crunch.mp3"))
};

class SoundEffects {
  error() {
    sounds.error.play();
  }

  crunch() {
    sounds.crunch.play();
  }
}

export default SoundEffects;
