import Point from "./point";

class MouseMover {
  constructor(mouse, cat) {
    this.mouse = mouse;
    this.cat = cat;
  }

  // May return undefined if there are no slots available
  pick() {
    console.debug("PICKING LOCATION", this.mouse, this.cat, this.options());
    return this.options()
    .sort(this.rank.bind(this))
    .shift();
  }

  options() {
    return this.mouse.grid.openSlotsNextTo(this.mouse.location);
  }

  rank(point) {
    return 1.0 / point.distance(this.cat.location);
  }
}

export default MouseMover;
