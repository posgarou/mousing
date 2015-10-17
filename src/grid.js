var _ = require("lodash");

import Point from "./point";

class Grid {
  constructor(w, h) {
    this.width = w;
    this.height = h;

    this.objects = [];
  }

  add(locatable) {
    this.objects.push(locatable);
  }

  remove(locatable) {
    _.remove(this.objects, locatable);
  }

  objectAt(x, y) {
    let point = new Point(x, y);

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
}

export default Grid;
