import Cat from "./cat";
import Mouse from "./mouse";
import Obstruction from "./obstruction";

import Grid from "./grid";
import Point from "./point";

class Game {
  constructor(settings={}) {
    this.listeners = {};

    let { height, width } = settings;

    this.grid = new Grid(this, width || 15, height || 7);

    this.cat = this.grid.add(new Cat(this.getAnEmptyLocation()));

    _.times(_.random(1, 4), () => {
      this.grid.add(new Mouse(this.getAnEmptyLocation()));
    });

    _.times(_.random(2, 12), () => {
      this.grid.add(new Obstruction(this.getAnEmptyLocation()));
    });
  }

  tick() {
    this.notify('tick');
  }

  notify(event, object) {
    this.notifyListeners(event, object || {});
  }

  addListener(event, cb) {
    this.listeners[event] = (this.listeners[event] || []).concat(cb);
  }

  removeListener(event, cb) {
    _.remove(this.listeners[event], cb);
  }

  notifyListeners(event, object) {
    let eventListeners = this.listeners[event] || [];

    eventListeners.forEach( (listener) => {
      listener(event, object);
    });
  }

  getAnEmptyLocation() {
    return this.grid.getAnEmptyLocation();
  }
}

export default Game;
