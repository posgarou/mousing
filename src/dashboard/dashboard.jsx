import React from "react";

const CLASSES = require("./dashboard.scss");

const GameDashboard = React.createClass({
  propTypes: {
    onRestart: React.PropTypes.func.isRequired
  },

  render: function() {
    return (
      <div
        className={CLASSES.Dashboard}>
        <button
          type="button"
          onClick={this.props.onRestart}>
          Restart
        </button>
      </div>
    );
  }
});

export default GameDashboard;
