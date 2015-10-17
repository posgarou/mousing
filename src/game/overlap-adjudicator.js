class OverlapAdjudicator {
  constructor(stationary, moving) {
    this.stationary = stationary;
    this.moving = moving;
  }

  canOverlap() {
    return this.stationary.canBeOverlappedBy(this.moving);
  }
}

export default OverlapAdjudicator;
