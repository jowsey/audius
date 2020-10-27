const TrackElement = require('./TrackElement')

module.exports = class {
  /**
   * Defines a Remix Parent object.
   * @param {TrackElement[]} tracks The IDs of tracks this track is based on.
   */
  constructor (tracks) {
    this.tracks = tracks
  }
}
