import React from "react";

import Game from "./game/game";

import GameView from "./game/game-view.jsx";
import GameSettings from "./settings/settings.jsx";
import GameDashboard from "./dashboard/dashboard.jsx";

import FinalStats from "./final-stats/stats.jsx";
import Header from "./header/header.jsx";

require("./app.scss");

const App = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentWillUnmount: function() {
    let { game } = this.state;

    if (game) this.unbindGameListeners();
  },

  render: function() {
    let { game } = this.state;

    return (
      <section>
        <Header />
        { this.renderFinalStats() }
        { this.renderGameSettings() }
        { this.renderGame() }
        {this.renderGameDashboard() }
      </section>
    );
  },

  renderFinalStats: function() {
    let { finalStats } = this.state;

    if (finalStats) {
      return (
        <FinalStats
          stats={finalStats}
        />
      );
    }
  },

  renderGameSettings: function() {
    if (!this.state.game) {
      return (
        <GameSettings
          onSubmit={this.startNewGame}
        />
      );
    }
  },

  renderGame: function() {
    if (this.state.game && !this.state.finalStats) {
      return (
        <GameView
          game={this.state.game}
        />
      );
    }
  },

  renderGameDashboard: function() {
    if (this.state.game) {
      return (
        <GameDashboard
          onRestart={this.restartGame}
        />
      );
    }
  },

  startNewGame: function(settings) {
    let game = new Game(settings);

    game.addListener('tick', this.onTick);
    game.addListener('game-over', this.onGameOver);

    this.setState({ game: game });
  },

  restartGame: function() {
    this.unbindGameListeners();

    this.setState({
      game: undefined,
      finalStats: undefined
    });
  },

  unbindGameListeners: function() {
    let { game } = this.state;

    game.removeListener('tick', this.onTick);
    game.removeListener('game-over', this.onGameOver);
  },

  onTick: function() {
    console.debug("ON TICK");
    this.forceUpdate();
  },

  onGameOver: function(_event, payload) {
    console.debug("ON GAME OVER");
    this.setState({
      finalStats: payload
    });
  }
});

var container = document.getElementById("app");

React.render(<App />, container);
