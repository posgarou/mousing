import Cat from "./cat";
import Mouse from "./mouse";
import Obstruction from "./obstruction";

import Grid from "./grid";

class Game {
  constructor() {
    this.grid = new Grid(15, 10);

    new Obstruction(this.grid, [2, 2]);
    new Obstruction(this.grid, [2, 3]);
    new Obstruction(this.grid, [3, 2]);
    new Obstruction(this.grid, [3, 3]);

    this.cat = new Cat(this.grid, [1, 1]);

    this.mouse = new Mouse(this.grid, [4, 4]);
  }
}

export default Game;
