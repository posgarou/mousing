import _ from "lodash";

class WeightedRandomPicker {
  // Each option should have an option key and a preference key
  constructor(options) {
    this.options = options;
  }

  pick() {
    let normalizedPreferences = this.normalizedPreferences();

    let preferenceTotal = _.sum(normalizedPreferences);
    let locator = _.random(preferenceTotal);

    let runningTotal = 0;

    for (let i=0; i<normalizedPreferences.length; i++) {
      let previousTotal = runningTotal;
      runningTotal += normalizedPreferences[i];

      if (_.inRange(locator, previousTotal, runningTotal))
        return this.options[i].option;
    }

    console.error("Something went wrong wtih the weighted random algorithm.");

    return _.sample(this.options).option;
  }

  normalizedPreferences() {
    let preferences = this.preferences();

    let min = _.min(preferences);

    return preferences.map( (preference) => preference - min );
  }

  preferences() {
    return _.pluck(this.options, "preference");
  }
}

export default WeightedRandomPicker;
