import React from "react";

import Point from "./point";

import Locatable from "./locatable";
import Cat from "./cat";
import Mouse from "./mouse";
import Obstruction from "./obstruction";

require("./cell.scss");

const Cell = React.createClass({
  propTypes: {
    point: React.PropTypes.instanceOf(Point).isRequired,
    object: React.PropTypes.instanceOf(Locatable)
  },

  render: function() {
    let { object } = this.props;

    let klass = "cell";

    if (object) {
      if (object instanceof Cat)
        klass += " cat";
      else if (object instanceof Mouse)
        klass += " mouse";
      else if (object instanceof Obstruction)
        klass += " impassible";
    }

    return (
      <div
        className={klass}>
      </div>
    );
  }
});

export default Cell;
