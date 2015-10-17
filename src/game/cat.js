import Locatable from "./locatable";

import Mouse from "./mouse";

class Cat extends Locatable {
  constructor(game, initialLocation) {
    super(game, initialLocation);
    this.miceEaten = 0;
  }

  overlap(otherLocatable) {
    if (otherLocatable instanceof Mouse)
      this.incrementMiceEaten();
  }

  incrementMiceEaten() {
    this.miceEaten += 1;
    this.emit('mouse-eaten');
  }
}

export default Cat;
