import React from "react";

import Game from "./game/game";

import GameView from "./game/game-view.jsx";
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
      <GameView
        restartGame={this.restartGame}
        game={this.state.game}
      />
    );
  },

  startNewGame: function(settings) {
    let game = new Game(settings);

    game.addListener('tick', this.onTick);

    this.setState({ game: game });
  },

  restartGame: function() {
    this.setState({ game: undefined });
  },

  onTick: function() {
    this.forceUpdate();
  }
});

var container = document.getElementById("app");

React.render(<App />, container);
