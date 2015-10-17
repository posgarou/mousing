class Point {
  static shift(point, x, y) {
    return new Point(point.x + x, point.y + y);
  }

  constructor(x, y) {
    if (x instanceof Array) {
      [this.x, this.y] = x;
    } else {
      this.x = x;
      this.y = y;
    }
  }

  toVector() {
    return [this.x, this.y];
  }

  equals(point) {
    return (this.x === point.x) && (this.y === point.y);
  }
}

export default Point;
