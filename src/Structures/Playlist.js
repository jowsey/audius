const Item = require('./Item')
const User = require('./User')

module.exports = class extends Item {
  /**
   * Defines a Playlist object.
   * @param {Object} artwork An object containing links to three different sizes of artwork.
   * @param {String} description The description of the playlist.
   * @param {String} id The unique ID of the playlist.
   * @param {Boolean} isAlbum Whether the playlist is an album or not.
   * @param {String} name The name of the playlist.
   * @param {Number} repostCount The number of times the playlist has been reposted.
   * @param {Number} favouriteCount The number of times the playlist has been favourited.
   * @param {Number} totalPlayCount The total number of track plays in the playlist.
   * @param {User} user The user that made the playlist.
   */
  constructor (artwork, description, id, isAlbum, name, repostCount, favouriteCount, totalPlayCount, user) {
    super(artwork, description, id, name, repostCount, favouriteCount, user)

    this.isAlbum = isAlbum
    this.totalPlayCount = totalPlayCount
  }
}
