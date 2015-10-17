import Cat from "./cat";
import Mouse from "./mouse";
import Obstruction from "./obstruction";

import Grid from "./grid";

class Game {
  constructor() {
    this.listeners = [];

    this.grid = new Grid(this, 15, 10);

    new Obstruction(this.grid, [2, 2]);
    new Obstruction(this.grid, [2, 3]);
    new Obstruction(this.grid, [3, 2]);
    new Obstruction(this.grid, [3, 3]);

    this.cat = new Cat(this.grid, [1, 1]);

    this.mouse = new Mouse(this.grid, [4, 4]);
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
}

export default Game;
