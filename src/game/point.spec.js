import { expect } from "chai";

import Point from "./point";

describe("Point", function() {
  describe("Point.shift", function() {
    it("returns a new point shifted x and y over", function() {
      let point = new Point(3, 3);
      let newPoint = Point.shift(point, 2, 3);

      expect(newPoint.toArray()).to.eql([5, 6]);
    });
  });

  describe("Point.adjacentTo", function() {
    it("returns all Points one away from point", function() {
      // i.e., it is expected to return even points outside the board range
      let point = new Point(0, 0);

      let neighbors = Point.adjacentTo(point).map( (point) => point.toArray() );

      expect(neighbors).to.eql([
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
      ]);
    });
  });

  describe("new()", function() {
    it("treats an array as containing x,y coordinates", function() {
      let coordinates = [4, 8];
      let point = new Point(coordinates);

      expect(point.x).to.eq(4);
      expect(point.y).to.eq(8);
    });

    it("understands two args to be two numbers x and y", function() {
      let point = new Point(5, 10);

      expect(point.x).to.eq(5);
      expect(point.y).to.eq(10);
    });
  });

  describe("toArray()", function() {
    it("returns an array of [x, y]", function() {
      let point = new Point(4, 5);

      expect(point.toArray()).to.eql([4, 5]);
    });
  });

  describe("equals()", function() {
    it("returns true when the x and y are equal", function() {
      let p1 = new Point(2, 3);
      let p2 = new Point(2, 3);

      expect(p1.equals(p2)).to.be.true;
    });

    it("returns false when the x is wrong", function() {
      let p1 = new Point(2, 3);
      let p2 = new Point(3, 3);

      expect(p1.equals(p2)).to.be.false;
    });

    it("returns false when the y is wrong", function() {
      let p1 = new Point(2, 3);
      let p2 = new Point(2, 4);

      expect(p1.equals(p2)).to.be.false;
    });
  });

  describe("distance()", function() {
    let point;

    beforeEach(function() {
      point = new Point(2, 2);
    });

    it("considers horizontal distance", function() {
      let otherPoint = Point.shift(point, 9, 0);

      expect(point.distance(otherPoint)).to.eql(9);
    });

    it("considers vertical distance", function() {
      let otherPoint = Point.shift(point, 0, 5);

      expect(point.distance(otherPoint)).to.eql(5);
    });

    it("considers both horizontal and vertical distance", function() {
      let otherPoint = Point.shift(point, 3, 4);

      expect(point.distance(otherPoint)).to.eql(5);
    });
  });
});
