module.exports = class {
  /**
   * Defines a Cover Photo object.
   * @param {String} small The small 640x640 cover photo.
   * @param {String} large The large 2000x2000 cover photo.
   */
  constructor (small, large) {
    this.small = this['640x'] = small
    this.large = this['2000x'] = large
  }
}
