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

const Game = React.createClass({
  propTypes: {
    game: React.PropTypes.instanceOf(GameLogic).isRequired
  },

  componentDidMount: function() {
    keymaster("left, right, up, down", "game-view", this.handleArrowKey);
    keymaster("r", "game-view", this.handleRKey);
    keymaster.setScope("game-view");

    this.props.game.channel.on("mouse-dead", this.onMouseDead);
    this.soundEffects = new SoundEffects();
  },

  componentWillUnmount: function() {
    keymaster.deleteScope("game-view");
    this.props.game.channel.off("mouse-dead", this.onMouseDead);
  },

  render: function() {
    return (
      <section
        className={CLASSES.Game}>
        {this.renderRows()}
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

  tryToMoveCat: function(vector) {
    let { grid, cat } = this.props.game;

    if (grid.move(cat, vector)) {
      this.tick();
    } else {
      this.soundEffects.error();
    }
  },

  handleArrowKey: function(e, handler) {
    let vector = {
      "up": [0, -1],
      "down": [0, 1],
      "right": [1, 0],
      "left": [-1, 0]
    }[handler.shortcut];

    this.tryToMoveCat(vector);
  },

  handleRKey: function() {
    let { cat } = this.props.game;

    if (cat.roar())
      this.soundEffects.roar();
    else
      this.soundEffects.error();
  },

  onMouseDead: function(event, _payload) {
    console.debug("MOUSE EATEN", event, _payload);
    this.soundEffects.crunch();
  },

  tick: function() {
    this.props.game.tick();
  }
});

export default Game;
