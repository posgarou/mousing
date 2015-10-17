import React from "react";

let cssClasses = require("./header.scss");

const Header = React.createClass({
  render: function() {
    return (
      <div
        className={cssClasses.Header}>
        {this.renderTitle()}
        {this.renderExplanation()}
      </div>
    );
  },

  renderTitle: function() {
    return (
      <h1>
        <span
          className={cssClasses.inner}>
          Mousing <small>the hunt begins</small>
        </span>
      </h1>
    );
  },

  renderExplanation: function() {
    return (
      <div
        className={cssClasses.Explanation}>
        <p>You are a hungry gif. Your quarry awaits.</p>
        <p>Pursue it and be victorious.</p>
      </div>
    );
  }
});

export default Header;
