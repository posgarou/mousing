import React from "react";

var GameLogic = require("./game/game");

import Game from "./game/game.jsx";
import GameSettings from "./settings/settings.jsx";
import Header from "./header/header.jsx";

require("./app.scss");

const App = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentWillUnmount: function() {
    let { game } = this.state;

    if (game) game.removeListener('tick', this.onTick);
  },

  render: function() {
    let { game } = this.state;

    return (
      <section>
        <Header />
        { game ? this.renderGame() : this.renderGameSettings() }
      </section>
    );
  },

  renderGameSettings: function() {
    return (
      <GameSettings
        onSubmit={this.startNewGame}
      />
    );
  },

  renderGame: function() {
    return (
      <Game
        game={this.state.game}
      />
    );
  },

  startNewGame: function(settings) {
    let game = new GameLogic(settings);

    game.addListener('tick', this.onTick);

    this.setState({ game: game });
  },

  onTick: function() {
    this.forceUpdate();
  }
});

var container = document.getElementById("app");

React.render(<App />, container);
