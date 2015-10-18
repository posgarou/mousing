import Point from "./point";
import WeightedRandomPicker from "../util/weighted-random";

import _ from "lodash";

class MouseMover {
  constructor(mouse, cat, cheese) {
    this.mouse = mouse;
    this.cat = cat;
    this.cheese = cheese;
  }

  // May return undefined if there are no slots available
  pick() {
    let options = this.options();

    if (options.length) {
      if (options.length === 1) {
        return options.shift();
      } else {
        let rankedByCat = this.rankByCatDistance(options);
        let rankedByCheese = this.rankByCheeseDistance(options);

        console.debug(rankedByCat);
        console.debug(rankedByCheese);

        let combinedPreferences = _.zip(rankedByCat, rankedByCheese).map(_.sum);

        let rankedOptions = options.map( (option, i) => {
          return (
            {
              option: option,
              preference: combinedPreferences[i]
            }
          );
        });

        return (new WeightedRandomPicker(rankedOptions)).pick();
      }
    }
  }

  /** Given an array of n locations, returns a corresponding array of n floats
   * that represent the mouse's preference toward/against the location based on
   * the location's distance from the cat.
   *
  /* @param [Array[Location]] options - a list of possible location options
  /* @return [Array[Float]] corresponding preferences (domain: [-1, 1])
   **/
  rankByCatDistance(options) {
    let optionsWithDistance = options.map(
      function(option) {
        return ({
          option: option,
          distance: this.distanceFromCat(option)
        });
      }.bind(this)
    );

    let distances = _.pluck(optionsWithDistance, 'distance');

    let [maxD, minD] = [_.max(distances), _.min(distances)];
    let middle = (maxD + minD) / 2.0;

    // The cat gets markedly more afraid as the cat gets closer
    //
    // minD can never be 0, since a mouse is not allowed to move on the same
    // cell as a cat.
    //
    // Domain: (0, 1]
    let fearFactor = Math.pow((1.0 / minD), 1.1);

    return optionsWithDistance.map( (option) => {
      return (option.distance - middle) * fearFactor;
    });
  }

  /** Given an array of n locations, returns a corresponding array of n floats
   * that represent the mouse's preference toward/against the location based on
   * its distance from the cheese.
   *
  /* @param [Array[Location]] options - a list of possible location options
  /* @return [Array[Float]] corresponding preferences (domain: [0, ~0.48])
   **/
  rankByCheeseDistance(options) {
    let optionsWithDistance = options.map(
      function(option) {
        return ({
          option: option,
          distance: this.distanceFromCheese(option)
        });
      }.bind(this)
    );

    let distances = _.pluck(optionsWithDistance, 'distance');

    let [maxD, minD] = [_.max(distances), _.min(distances)];
    let middle = (maxD + minD) / 2.0;

    // The cat gets markedly more excited as it gets closer to the cheese
    //
    // minD can be 0
    //
    // Domain: (0, 1]
    let hungerFactor = Math.pow((0.7 / (minD + 1)), 1.05);

    return optionsWithDistance.map( (option) => {
      return (middle - option.distance) * hungerFactor;
    });
  }

  options() {
    return this.mouse.grid.validMovesFor(this.mouse);
  }

  distanceFromCat(point) {
    return point.distance(this.cat.location);
  }

  distanceFromCheese(point) {
    return point.distance(this.cheese.location);
  }
}

export default MouseMover;
