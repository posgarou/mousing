class SettingsForm {
  constructor() {
    this.width = 15;
    this.height = 6;
    this.errors = [];
  }

  update(attr, value) {
    this[attr] = value;
  }

  validate() {
    this.errors = [];

    this.validateRange("width", 4, 15);
    this.validateRange("height", 4, 7);

    return this.errors.length === 0;
  }

  validateRange(attr, lower, upper) {
    let value = this[attr];

    if (value < lower)
      this.errors.push(`${attr} is too small (min ${lower})`);
    else if (value > upper)
      this.errors.push(`${attr} is too big (max ${upper})`);
  }
}

export default SettingsForm;
