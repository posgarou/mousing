class Point {
  static shift(point, x, y) {
    return new Point(point.x + x, point.y + y);
  }

  static adjacentTo(point) {
    return [
      Point.shift(point, 1, 0),
      Point.shift(point, -1, 0),
      Point.shift(point, 0, 1),
      Point.shift(point, 0, -1)
    ];
  }

  constructor(x, y) {
    if (x instanceof Array) {
      [this.x, this.y] = x;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  toArray() {
    return [this.x, this.y];
  }

  equals(point) {
    return (this.x === point.x) && (this.y === point.y);
  }

  distance(point) {
    return Math.sqrt(
      Math.pow((this.x - point.x), 2) +
      Math.pow((this.y - point.y), 2)
    );
  }
}

export default Point;
