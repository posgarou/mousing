import React from "react";
import keymaster from "keymaster";

var _ = require("lodash");

const CLASSES = require("./game.scss");

var GameLogic = require("./game");
import Mouse from "./mouse";
import Point from "./point";
import SoundEffects from "./sound-effects";

import Row from "./grid/row.jsx";
import Cell from "./grid/cell/cell.jsx";

import GameDashboard from "./dashboard/dashboard.jsx";

const Game = React.createClass({
  propTypes: {
    game: React.PropTypes.instanceOf(GameLogic).isRequired,

    restartGame: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    keymaster("left, right, up, down", "game-arrows", this.handleKeyPress);
    keymaster.setScope("game-arrows");

    this.props.game.addListener("remove", this.onObjectRemoval);
    this.soundEffects = new SoundEffects();
  },

  componentWillUnmount: function() {
    keymaster.deleteScope("game-arrows");
    this.props.game.removeListener("remove", this.onObjectRemoval);
  },

  render: function() {
    return (
      <section
        className={CLASSES.Game}>
        {this.renderRows()}

        {this.renderDashboard()}
      </section>
    );
  },

  renderRows: function() {
    let { game } = this.props;
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

  renderDashboard: function() {
    return (
      <GameDashboard
        onRestart={this.props.restartGame}
      />
    );
  },

  tryToMoveCat: function(x, y) {
    let { cat } = this.props.game;
    let currentLocation = cat.location;
    let newLocation = Point.shift(cat.location, x, y);

    console.debug(currentLocation);
    console.debug(newLocation);

    console.debug(cat.motherMayI(newLocation));

    if (cat.motherMayI(newLocation)) {
      cat.moveTo(newLocation);
      this.tick();
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

  onObjectRemoval: function(_event, object) {
    if (object instanceof Mouse)
      this.soundEffects.crunch();
  },

  tick: function() {
    this.props.game.tick();
  }
});

export default Game;
