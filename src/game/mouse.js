import Locatable from "./locatable";

import Cat from "./cat";

class Mouse extends Locatable {
  constructor(game, initialLocation) {
    super(game, initialLocation);

    this.canMoveIn = 0;
  }

  canMove() {
    return !this.canMoveIn;
  }

  tick() {
    console.debug("Mouse tick");

    if (this.canMoveIn)
      this.canMoveIn -= 1;
    else
      this.terrified = false;
  }

  terrify() {
    console.debug("Mouse is terrified.");

    this.canMoveIn = 4;
    this.terrified = true;
  }

  canBeOverlappedBy(otherLocatable) {
    return (otherLocatable instanceof Cat);
  }

  beOverlappedBy(otherLocatable) {
    if (otherLocatable instanceof Cat)
      this.channel.emit('mouse-dead', this);
  }
}

export default Mouse;
