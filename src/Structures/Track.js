const RemixParent = require('./RemixParent')
const Item = require('./Item')
const User = require('./User')

module.exports = class extends Item {
  /**
   * Defines a Track object.
   * @param {Object} artwork An object containing links to three sizes of artwork.
   * @param {String} description The track's description.
   * @param {String} genre The genre of the track.
   * @param {String} id The unique ID of the track.
   * @param {String} mood The mood of the track.
   * @param {String} releaseDate The release date of the track.
   * @param {Object} remixOf The original track the track remixes, if any.
   * @param {Number} repostCount The number of times the track has been reposted.
   * @param {Number} favouriteCount The number of times the track has been favourited.
   * @param {Number} playCount The number of times the track has been played.
   * @param {Array[String]} tags The track's tags that define its content.
   * @param {String} title The title of the track.
   * @param {User} user The user that uploaded the track.
   * @param {Number} duration The length of the track in seconds.
   * @param {Boolean} downloadable Whether or not the track is downloadable.
   */
  constructor (artwork, description, genre, id, mood, releaseDate, remixOf, repostCount, favouriteCount, playCount, tags, title, user, duration, downloadable) {
    super(artwork, description, id, title, repostCount, favouriteCount)

    this.genre = genre
    this.mood = mood
    this.releaseDate = releaseDate
    this.remixOf = JSON.stringify(remixOf) !== '{"tracks":null}' ? new RemixParent(remixOf) : null
    this.playCount = playCount
    this.tags = tags
    this.user = user
    this.duration = duration
    this.downloadable = downloadable
  }
}
