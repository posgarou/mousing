import React from "react";

import Game from "./game/game";

import GameView from "./game/game-view.jsx";
import GameSettings from "./settings/settings.jsx";
import GameDashboard from "./dashboard/dashboard.jsx";

import FinalStats from "./final-stats/stats.jsx";
import Header from "./header/header.jsx";

import SoundEffects from "./game/sound-effects";

require("./app.scss");

const App = React.createClass({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    this.soundEffects = new SoundEffects();
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

    game.channel.on('tick', this.onTick);
    game.channel.on('game-over', this.onGameOver);

    this.setState({ game: game });
  },

  restartGame: function() {
    this.state.game.channel.allOff();

    this.setState({
      game: undefined,
      finalStats: undefined
    });
  },

  onTick: function() {
    console.debug("ON TICK");
    this.forceUpdate();
  },

  onGameOver: function(finalStats) {
    if (finalStats.won) {
      this.soundEffects.purring();
    } else {
      this.soundEffects.mouseSqueak();
    }

    this.setState({
      finalStats: finalStats
    });
  }
});

var container = document.getElementById("app");

React.render(<App />, container);
