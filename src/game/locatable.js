import EventEmitter from "event-emitter";

import Point from "./point";

function coerceToPoint(point) {
  if (point instanceof Point) {
    return point;
  } else {
    return new Point(point);
  }
}

class Locatable {
  constructor(game, initialLocation) {
    this.game = game;
    this.location = coerceToPoint(initialLocation);
    this.channel = new EventEmitter();
  }

  moveTo(point) {
    let current = this.grid.objectAt(point);

    if (current) {
      current.beOverlappedBy(this);
      this.overlap(current);
    }

    this.location = coerceToPoint(point);
  }

  isAt(point) {
    return this.location.equals(coerceToPoint(point));
  }

  canBeOverlappedBy(otherLocatable) {
    return false;
  }

  beOverlappedBy() {
    console.error("Abstract method.");
  }

  overlap() {}
}

export default Locatable;
