import EventEmitter from "event-emitter";

import Cat from "./cat";
import Mouse from "./mouse";
import Cheese from "./cheese";
import Obstruction from "./obstruction";

import MouseMover from "./mouse-mover";

import Grid from "./grid";
import Point from "./point";

class Game {
  constructor(settings={}) {
    this.channel = new EventEmitter();

    this.moves = 0;

    let { height, width } = settings;

    this.grid = new Grid(this, width || 15, height || 7);

    this.cat = this.place(Cat);

    this.cat.channel.on("cat-roar", this.onCatRoar.bind(this));

    this.cheese = this.place(Cheese);

    this.cheese.channel.once("cheese-eaten", this.onCheeseEaten.bind(this));

    this.mice = _.range(0, _.random(1, 4)).map(function() {
      let mouse = this.place(Mouse);

      mouse.channel.once("mouse-dead", this.onMouseDead.bind(this));

      return mouse;
    }.bind(this));

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

  onMouseDead(mouse) {
    this.grid.remove(mouse);
    _.remove(this.mice, mouse);

    this.channel.emit("mouse-dead");

    if (!this.mice.length) this.finish();
  }

  onCheeseEaten() {
    this.finish(false);
  }

  onCatRoar() {
    this.mice.forEach( mouse => mouse.terrify() );
  }

  tick() {
    this.mice.forEach( (mouse) => {
      if (!mouse.canMove()) return;

      let mover = new MouseMover(mouse, this.cat, this.cheese);
      let choice = mover.pick();

      if (choice) this.grid.moveTo(mouse, choice);
    });

    this.moves += 1;

    this.cat.tick();

    this.mice.forEach( mouse => mouse.tick() );

    this.channel.emit('tick');
  }

  finish(won=true) {
    this.moves += 1;

    this.channel.emit('game-over', {
      won: won,
      moves: this.moves
    });
  }

  getAnEmptyLocation() {
    return this.grid.getAnEmptyLocation();
  }
}

export default Game;
