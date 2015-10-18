import Locatable from "./locatable";

import Mouse from "./mouse";

class Cheese extends Locatable {
  canBeOverlappedBy(otherLocatable) {
    return (otherLocatable instanceof Mouse);
  }

  beOverlappedBy(otherLocatable) {
    if (otherLocatable instanceof Mouse)
      this.channel.emit('cheese-eaten', this);
  }
}

export default Cheese;
