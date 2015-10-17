import Locatable from "./locatable";

import Mouse from "./mouse";

class Cat extends Locatable {
  constructor(initialLocation) {
    super(initialLocation);
    this.miceEaten = 0;
  }

  canOverlapWith(otherLocatable) {
    return (otherLocatable instanceof Mouse);
  }

  overlapWith(otherLocatable) {
    if (otherLocatable instanceof Mouse)
      this.incrementMiceEaten();
  }

  incrementMiceEaten() {
    this.miceEaten += 1;
  }
}

export default Cat;
