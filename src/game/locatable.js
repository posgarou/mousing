import Point from "./point";

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

    if (current) {
      current.overlapWith(this);
    }

    this.location = coerceToPoint(point);
  }

  removeFromGrid(grid) {
    this.grid.remove(this);
  }

  isAt(point) {
    return this.location.equals(coerceToPoint(point));
  }

  canOverlapWith(otherLocatable) {
    return false;
  }
}

export default Locatable;
