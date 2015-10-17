import Locatable from "./locatable";

import Cat from "./cat";

class Mouse extends Locatable {
  canOverlapWith(otherLocatable) {
    return (otherLocatable instanceof Cat);
  }

  overlapWith(otherLocatable) {
    if (otherLocatable instanceof Cat)
      this.removeFromGrid();
  }
}

export default Mouse;
