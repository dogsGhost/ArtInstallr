const utils = {
  /**
   * Converts a measurement given in feet/inches into just inches.
   * @param  {string} feet   A value representing the feet part of a measurement.
   * @param  {string} inches A value representing the inches part of a measurement.
   * @return {number}        The sum of feet and inches given in terms of inches.
   */
  toInches(feet, inches) {
    return (feet * 12) + Number(inches);
  }
};

module.exports = utils;