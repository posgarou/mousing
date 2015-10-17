import Cat from "./cat";
import Mouse from "./mouse";
import Obstruction from "./obstruction";

import Grid from "./grid";
import Point from "./point";

class Game {
  constructor(settings={}) {
    this.listeners = {};

    this.moves = 0;

    let { height, width } = settings;

    this.grid = new Grid(this, width || 15, height || 7);

    this.cat = this.place(Cat);


    this.mice = _.range(0, _.random(1, 4)).map( () => {
      return this.place(Mouse);
    });

    _.times(_.random(2, 12), () => {
      this.place(Obstruction);
    });
  }

  place(locatableClass) {
    return this.grid.add(
      new locatableClass(
        this,
        this.getAnEmptyLocation()
      )
    );
  }

  removeMouse(mouse) {
    this.grid.remove(mouse);
    _.remove(this.mice, mouse);

    if (!this.mice.length) this.finish();
  }

  tick() {
    this.moves += 1;

    this.notify('tick');
  }

  finish() {
    this.notify('game-over', {
      won: true,
      moves: this.moves
    });
  }

  fyi(source, event, payload) {
    console.debug("FYI", source, event, payload);
    if (event === "mouse-dead")
      this.removeMouse(source);

    this.notify(event, payload);
  }

  notify(event, object) {
    this.notifyListeners(event, object || {});
  }

  addListener(event, cb) {
    console.debug('Adding event listener', event, cb);
    this.listeners[event] = (this.listeners[event] || []).concat(cb);
  }

  removeListener(event, cb) {
    console.debug("REMOVING LISTENERS FOR", event);
    _.remove(this.listeners[event], cb);
    console.debug("REMOVED LISTENERS FOR", event);
  }

  notifyListeners(event, object) {
    let eventListeners = this.listeners[event] || [];
    console.debug(this.listeners, event, eventListeners);

    eventListeners.forEach( (listener) => {
      listener(event, object);
    });
  }

  getAnEmptyLocation() {
    return this.grid.getAnEmptyLocation();
  }
}

export default Game;
