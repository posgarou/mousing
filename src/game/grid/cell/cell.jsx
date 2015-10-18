import React from "react";

import Locatable from "../../locatable";
import Point from "../../point";

require("./cell.scss");

const Cell = React.createClass({
  propTypes: {
    point: React.PropTypes.instanceOf(Point).isRequired,
    object: React.PropTypes.instanceOf(Locatable)
  },

  render: function() {
    let { object } = this.props;

    let klass = "cell";

    if (object)
      klass += " " + object.constructor.name;

    return (
      <div
        className={klass}>
      </div>
    );
  }
});

export default Cell;
