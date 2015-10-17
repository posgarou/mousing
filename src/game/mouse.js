import Locatable from "./locatable";

import Cat from "./cat";

class Mouse extends Locatable {
  canBeOverlappedBy(otherLocatable) {
    return (otherLocatable instanceof Cat);
  }

  beOverlappedBy(otherLocatable) {
    if (otherLocatable instanceof Cat)
      this.emit('mouse-dead');
  }
}

export default Mouse;
