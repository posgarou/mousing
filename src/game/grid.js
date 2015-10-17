var _ = require("lodash");

import Point from "./point";

import OverlapAdjudicator from "./overlap-adjudicator";

class Grid {
  constructor(game, w, h) {
    this.game = game;

    this.width = w;
    this.height = h;

    this.objects = [];
  }

  add(locatable) {
    this.objects.push(locatable);
    locatable.grid = this;
    this.game.notify('add', locatable);

    return locatable;
  }

  remove(locatable) {
    _.remove(this.objects, locatable);
  }

  move(locatable, vector) {
    let [x, y] = vector;
    let proposedLocation = Point.shift(locatable.location, x, y);

    if (this.canMove(locatable, proposedLocation)) {
      locatable.moveTo(proposedLocation);
      return true;
    } else {
      return false;
    }
  }

  canMove(locatable, proposedLocation) {
    if (this.isInBounds(proposedLocation)) {
      let current = this.objectAt(proposedLocation);

      return !current || (new OverlapAdjudicator(current, locatable)).canOverlap();
    } else {
      return false;
    }
  }

  objectAt(x, y) {
    let point = (typeof y !== "undefined") ? new Point(x, y) : x;

    return _.find(this.objects, (object) => {
      return object.isAt(point);
    });
  }

  isEmpty(point) {
    return !this.objectAt(point.x, point.y);
  }

  isInBounds(point) {
    return (point.x >= 0) && (point.y >= 0) && (point.x < this.width) && (point.y < this.height);
  }

  getAnEmptyLocation() {
    let { height, width } = this;

    let proposal = new Point(_.random(width - 1), _.random(height - 1));

    return this.isEmpty(proposal) ? proposal : this.getAnEmptyLocation();
  }
}

export default Grid;
