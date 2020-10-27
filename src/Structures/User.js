const Artwork = require('./Artwork')
const CoverPhoto = require('./CoverPhoto')

module.exports = class {
  /**
   * Defines a User object.
   * @param {Number} albumCount The number of albums this user has published.
   * @param {String} bio The bio of the user.
   * @param {Object} coverPhoto An object containing three sizes of cover photo.
   * @param {Number} following The number of accounts this user is following.
   * @param {Number} followers The number of users that are following this account.
   * @param {String} handle The permanent name of the user.
   * @param {String} id The unique ID of the user.
   * @param {Boolean} verified Whether the user is verified or not.
   * @param {String} location The location set on the user's profile.
   * @param {String} name The customisable name on the user's profile.
   * @param {Number} playlistCount The number of playlists the user has published.
   * @param {Object} profilePicture An object containing three sizes of profile picture.
   * @param {Number} repostCount The number of tracks the user has reposted.
   * @param {Number} trackCount The number of original tracks the user has published.
   */
  constructor (albumCount, bio, coverPhoto, following, followers, handle, id, verified, location, name, playlistCount, profilePicture, repostCount, trackCount) {
    this.id = id
    this.name = name
    this.handle = handle
    this.bio = bio
    this.verified = verified
    this.location = location
    this.following = following
    this.followers = followers
    this.albumCount = albumCount
    this.trackCount = trackCount
    this.repostCount = repostCount
    this.playlistCount = playlistCount
    this.coverPhoto = coverPhoto ? new CoverPhoto(coverPhoto['640x'], coverPhoto['2000x']) : {}
    this.profilePicture = profilePicture ? new Artwork(profilePicture['150x150'], profilePicture['480x480'], profilePicture['1000x1000']) : {}
  }
}
