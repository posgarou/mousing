import React from "react";

const CLASSES = require("./stats.scss");

const FinalStats = React.createClass({
  propTypes: {
    stats: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div
        className={CLASSES.Stats}>
        <h2>Congratulations!</h2>
        <p>You won in {this.props.stats.moves} moves!</p>
      </div>
    );
  }
});

export default FinalStats;
