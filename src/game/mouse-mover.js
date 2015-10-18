import Point from "./point";

import _ from "lodash";

class MouseMover {
  constructor(mouse, cat) {
    this.mouse = mouse;
    this.cat = cat;
  }

  // May return undefined if there are no slots available
  pick() {
    let options = this.options();

    if (options.length) {
      let groupedOptions = _.groupBy(this.options(), this.rank.bind(this));

      let furthestDistance = _.max(
        _.keys(groupedOptions).map( (k) => parseFloat(k, 10) )
      );

      console.debug(groupedOptions, furthestDistance);

      return _.shuffle(groupedOptions[furthestDistance]).shift();
    }
  }

  options() {
    return this.mouse.grid.openSlotsNextTo(this.mouse.location);
  }

  // higher is better
  rank(point) {
    return point.distance(this.cat.location);
  }
}

export default MouseMover;
