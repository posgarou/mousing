import Locatable from "./locatable";

import Mouse from "./mouse";

class Cat extends Locatable {
  canOverlapWith(otherLocatable) {
    return (otherLocatable instanceof Mouse);
  }

  overlapWith(otherLocatable) {
  }
}

export default Cat;
