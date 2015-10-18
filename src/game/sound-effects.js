const sounds = {
  error: new Audio(require("./sounds/error.mp3")),
  crunch: new Audio(require("./sounds/crunch.mp3")),
  purring: new Audio(require("./sounds/purring.mp3")),
  mouseSqueak: new Audio(require("./sounds/mouse-squeak.mp3")),
  roar: new Audio(require("./sounds/roar.mp3")),
};

class SoundEffects {
  error() {
    this.playSound(sounds.error);
  }

  crunch() {
    this.playSound(sounds.crunch);
  }

  purring() {
    this.playSound(sounds.purring);
  }

  mouseSqueak() {
    this.playSound(sounds.mouseSqueak);
  }

  roar() {
    this.playSound(sounds.roar);
  }

  playSound(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
}

export default SoundEffects;
