module.exports = class {
  /**
   * Defines an Artwork object.
   * @param {String} small The small 100x100 artwork.
   * @param {String} medium The medium 480x480 artwork.
   * @param {String} large The large 1000x1000 artwork.
   */
  constructor (small, medium, large) {
    this.small = this['150x'] = small
    this.medium = this['480x'] = medium
    this.large = this['1000x'] = large
  }
}
