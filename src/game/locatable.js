import Point from "./point";

import OverlapAdjudicator from "./overlap-adjudicator";

function coerceToPoint(point) {
  if (point instanceof Point) {
    return point;
  } else {
    return new Point(point);
  }
}

class Locatable {
  constructor(initialLocation) {
    this.location = coerceToPoint(initialLocation);
  }

  moveTo(point) {
    var current = this.grid.objectAt(point.x, point.y);
    console.debug("Current:", current);

    if (current) {
      console.debug("Overlapping with", current);
      current.overlapWith(this);
    }

    this.location = coerceToPoint(point);
  }

  removeFromGrid(grid) {
    this.grid.remove(this);
  }

  motherMayI(point) {
    if (this.grid.isInBounds(point)) {
      var current = this.grid.objectAt(point.x, point.y);

      return !current || (new OverlapAdjudicator(current, this)).canOverlap();
    } else {
      return false;
    }
  }

  isAt(point) {
    return this.location.equals(coerceToPoint(point));
  }

  canOverlapWith(otherLocatable) {
    return false;
  }
}

export default Locatable;
