import Cat from "./cat";
import Mouse from "./mouse";
import Obstruction from "./obstruction";

import Grid from "./grid";
import Point from "./point";

class Game {
  constructor() {
    this.listeners = [];

    this.grid = new Grid(this, 15, 10);

    this.cat = new Cat(this.grid, this.getAnEmptyLocation());

    _.times(_.random(1, 4), () => {
      new Mouse(this.grid, this.getAnEmptyLocation());
    });

    _.times(_.random(2, 12), () => {
      new Obstruction(this.grid, this.getAnEmptyLocation());
    });
  }

  notify(event, object) {
    this.notifyListeners(event, object);
  }

  addListener(cb) {
    this.listeners.push(cb);
  }

  removeListener(cb) {
    _.remove(this.listeners, cb);
  }

  notifyListeners(event, object) {
    this.listeners.forEach( (listener) => {
      listener(event, object);
    });
  }

  getAnEmptyLocation() {
    let { height, width } = this.grid;
    let proposal = new Point(_.random(width - 1), _.random(height - 1));

    return this.grid.isEmpty(proposal) ? proposal : this.getAnEmptyLocation();
  }
}

export default Game;
