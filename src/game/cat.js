import Locatable from "./locatable";

import Mouse from "./mouse";

class Cat extends Locatable {
  constructor(game, initialLocation) {
    super(game, initialLocation);
    this.miceEaten = 0;
    this.canRoarIn = 0;
  }

  overlap(otherLocatable) {
    if (otherLocatable instanceof Mouse)
      this.incrementMiceEaten();
  }

  tick() {
    console.debug("Mouse tick");
    if (this.canRoarIn) this.canRoarIn -= 1;
  }

  roar() {
    if (this.canRoarIn) {
      return false;
    } else {
      this.channel.emit('cat-roar', this);
      this.canRoarIn = 15;

      return true;
    }
  }

  incrementMiceEaten() {
    this.miceEaten += 1;
    this.channel.emit('mouse-eaten', this);
  }
}

export default Cat;
