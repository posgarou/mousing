import React from "react";
import keymaster from "keymaster";

var _ = require("lodash");

var Game = require("./game");
import Mouse from "./mouse";
import Point from "./point";
import SoundEffects from "./sound-effects";

var Row = require("./row");
var Cell = require("./cell");

require("./app.scss");

const App = React.createClass({
  getInitialState: function() {
    return {
      game: new Game()
    }
  },

  componentDidMount: function() {
    keymaster("left, right, up, down", this.handleKeyPress);
    this.state.game.addListener(this.receiveGameEvent);
    this.soundEffects = new SoundEffects();
  },

  componentWillUnmount: function() {
    keymaster.unbind("left, right, up, down", this.handleKeyPress);
    this.state.game.removeListener(this.receiveGameEvent);
  },

  render: function() {
    return (
      <section>
        {this.renderRows()}
      </section>
    );
  },

  renderRows: function() {
    let { game } = this.state;
    let { grid } = game;

    return (
      _.range(0, grid.height).map( (j) => {
        return (
          <Row
            key={j}>
            {_.range(0, grid.width).map( (i) => {
              return (
                <Cell
                  key={i}
                  point={new Point(i, j)}
                  object={grid.objectAt(i, j)}
                />
              );
            })}
          </Row>
        );
      })
    );
  },

  tryToMoveCat: function(x, y) {
    let { cat } = this.state.game;
    let currentLocation = cat.location;
    let newLocation = Point.shift(cat.location, x, y);

    console.debug(currentLocation);
    console.debug(newLocation);

    if (cat.motherMayI(newLocation)) {
      cat.moveTo(newLocation);
      this.setState({ game: this.state.game });
    } else {
      this.soundEffects.error();
    }
  },

  handleKeyPress: function(e, handler) {
    let vector = {
      "up": [0, -1],
      "down": [0, 1],
      "right": [1, 0],
      "left": [-1, 0]
    }[handler.shortcut];

    console.debug(handler.shortcut, vector);

    this.tryToMoveCat(vector[0], vector[1]);
  },

  receiveGameEvent: function(event, object) {
    if (event === "remove" && object instanceof Mouse)
      this.soundEffects.crunch();
  }
});

var container = document.getElementById("app");

React.render(<App />, container);
