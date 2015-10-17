import React from "react";

import SettingsForm from "./settings-form";

const CLASSES = require("./settings.scss");

const GameSettings = React.createClass({
  propTypes: {
    onSubmit: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      settings: new SettingsForm(),
      errors: []
    };
  },

  render: function() {
    let { settings } = this.state;

    return (
      <form
        className={CLASSES.Settings}
        onSubmit={this.onSubmit}>
        <p>
          I want to play a
          <input
            type="number"
            value={settings.width}
            onChange={this.updateForm.bind(null, 'width')}
          />
          by
          <input
            type="number"
            value={settings.height}
            onChange={this.updateForm.bind(null, 'height')}
          />
          .
          {this.renderErrors()}
          <button
            type="submit">
            Play!
          </button>
        </p>
      </form>
    );
  },

  renderErrors: function() {
    let { errors } = this.state;

    if (errors.length) {
      return (
        <div
          className={CLASSES.Errors}>
          <strong>That's not going to fly.</strong>
          <ul>
            {errors.map( (error, i) => <li key={i}>{error}</li> )}
          </ul>
        </div>
      );
    }
  },

  updateForm: function(attr, e) {
    let { settings } = this.state;

    settings.update(attr, e.target.value);

    settings.validate();

    this.setState({ settings: settings, errors: settings.errors });
  },

  onSubmit: function(e) {
    e.preventDefault();

    let { settings } = this.state;

    settings.validate();

    let { errors } = this.state.settings;

    if (errors.length) {
      this.setState({ errors: errors });
    } else {
      this.props.onSubmit(settings);
    }
  }
});

export default GameSettings;
