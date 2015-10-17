class OverlapAdjudicator {
  constructor(stationary, moving) {
    this.stationary = stationary;
    this.moving = moving;
  }

  canOverlap() {
    return this.stationary.canOverlapWith(this.moving) && this.moving.canOverlapWith(this.stationary);
  }
}

export default OverlapAdjudicator;
