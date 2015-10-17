import React from "react";

var GameLogic = require("./game");

import Game from "./game.jsx";

require("./app.scss");

const App = React.createClass({
  getInitialState: function() {
    return {
      game: new GameLogic()
    }
  },

  componentDidMount: function() {
    this.state.game.addListener('tick', this.onTick);
  },

  componentWillUnmount: function() {
    this.state.game.addListener('tick', this.onTick);
  },

  render: function() {
    return (
      <section>
        <h1>Catting</h1>
        <Game
          game={this.state.game}
        />
      </section>
    );
  },

  onTick: function() {
    this.forceUpdate();
  }
});

var container = document.getElementById("app");

React.render(<App />, container);
