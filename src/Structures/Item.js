const Artwork = require('./Artwork')
const User = require('./User')

module.exports = class {
  /**
   * Defines an Item object.
   * @param {Object} artwork An object containing links to three sizes of the Item's artwork.
   * @param {String} description The item's description.
   * @param {String} id The item's unique ID.
   * @param {String} title The item's name.
   * @param {Number} repostCount The number of times the Item has been reposted.
   * @param {Number} favouriteCount The number of times the item has been favourited.
   * @param {User} user The user that uploaded the item.
   */
  constructor (artwork, description, id, title, repostCount, favouriteCount, user) {
    /**
     * @type {Artwork}
     */
    this.artwork = artwork ? new Artwork(artwork['150x150'], artwork['480x480'], artwork['1000x1000']) : {}
    this.description = description
    this.id = id
    this.title = title
    this.repostCount = repostCount
    this.favouriteCount = favouriteCount
    this.user = user
  }
}
