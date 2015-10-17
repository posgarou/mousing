const sounds = {
  error: new Audio(require("./sounds/error.mp3")),
  crunch: new Audio(require("./sounds/crunch.mp3"))
};

class SoundEffects {
  error() {
    this.playSound(sounds.error);
  }

  crunch() {
    this.playSound(sounds.crunch);
  }

  playSound(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
  }
}

export default SoundEffects;
