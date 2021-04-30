const fetch = require('node-fetch')
const querystring = require('querystring')

const User = require('./Structures/User')
const Favourite = require('./Structures/Favourite')
const Track = require('./Structures/Track')
const Playlist = require('./Structures/Playlist')

const { _prefix, getHost, apiVersion } = require('./util')
const { Stream } = require('stream')

/**
 * @typedef {'Electronic'|'Rock'|'Metal'|'Alternative'|'Hip-Hop/Rap'|'Experimental'|'Punk'|'Folk'|'Pop'|'Ambient'|'Soundtrack'|'World'|'Jazz'|'Acoustic'|'Funk'|'R&B/Soul'|'Devotional'|'Classical'|'Reggae'|'Podcasts'|'Country'|'Spoken Word'|'Comedy'|'Blues'|'Kids'|'Audiobooks'|'Latin'|'Techno'|'Trap'|'House'|'Tech House'|'Deep House'|'Disco'|'Electro'|'Jungle'|'Progressive House'|'Hardstyle'|'Glitch Hop'|'Trance'|'Future Bass'|'Future House'|'Tropical House'|'Downtempo'|'Drum & Bass'|'Dubstep'|'Jersey Club'|'Vaporwave'|'Moombahton'} Genres
 */

module.exports = class {
  constructor (appName) {
    appName ? this.appName = appName : console.log(_prefix, 'In the future, please provide a name for your Audius app! (This can be anything!)')
  }

  /**
   * Get a list of users based on a search term.
   * @param {string} search The term to search.
   * @type {User[]}
   */
  async searchUsers (search) {
    if (!this.host) this.host = await getHost()

    if (!search) {
      throw Error(_prefix + ' searchUser() expected user search term, but got none.')
    } else {
      const res = await fetch(this.host + `/${apiVersion}/users/search?${querystring.stringify({ app_name: this.appName, query: search })}`)
      const json = await res.json()
      const data = json.data

      return data ? data.map(u => new User(u.album_count, u.bio, u.cover_photo, u.followee_count, u.follower_count, u.handle, u.id, u.is_verified, u.location, u.name, u.playlist_count, u.profile_picture, u.repost_count, u.track_count)) : null
    }
  }

  /**
   * Get a user by its ID.
   * @param {string} id The ID of the user to retrieve.
   * @type {User}
   */
  async getUser (id) {
    if (!this.host) this.host = await getHost()

    if (!id) {
      throw Error(_prefix + ' getUser() expected user ID, but got none.')
    } else {
      const res = await fetch(this.host + `/${apiVersion}/users/${id}?${querystring.stringify({ app_name: this.appName })}`)
      const json = await res.json()
      const u = json.data

      return u ? new User(u.album_count, u.bio, u.cover_photo, u.followee_count, u.follower_count, u.handle, u.id, u.is_verified, u.location, u.name, u.playlist_count, u.profile_picture, u.repost_count, u.track_count) : null
    }
  }

  /**
   * Get a user's favourites.
   * @param {string} id The ID of the user to retrieve favourites of.
   * @type {Favourite[]}
   */
  async getUserFavourites (id) {
    if (!this.host) this.host = await getHost()

    if (!id) {
      throw Error(_prefix + ' getUserFavourites() expected user ID, but got none.')
    } else {
      const res = await fetch(this.host + `/${apiVersion}/users/${id}/favorites?${querystring.stringify({ app_name: this.appName })}`)
      const json = await res.json()
      const data = json.data

      return data ? data.map(f => new Favourite(f.favorite_item_id, f.favorite_type.substring(9), f.user_id)) : null
    }
  }

  /**
   * Get all tracks uploaded by a specific user.
   * @param {string} id The ID of the user to retrieve tracks of.
   * @type {Track[]}
   */
  async getUserTracks (id) {
    if (!this.host) this.host = await getHost()

    if (!id) {
      throw Error(_prefix + ' getUserTracks() expected user ID, but got none.')
    } else {
      const res = await fetch(this.host + `/${apiVersion}/users/${id}/tracks?${querystring.stringify({ app_name: this.appName })}`)
      const json = await res.json()
      const data = json.data

      const tracks = []
      const users = await Promise.all(data.map(t => this.getUser(t.user.id)))

      for (let i = 0; i < users.length; i++) {
        const t = data[i]
        const user = users[i]
        tracks.push(new Track(t.artwork, t.description, t.genre, t.id, t.mood, t.release_date, t.remix_of, t.repost_count, t.favorite_count, t.play_count, t.tags ? t.tags.split(',') : [], t.title, user, t.duration, t.downloadable))
      }
      return tracks
    }
  }

  /**
   * Search for tracks by name.
   * @param {String} search The search term to find tracks by.
   * @type {Track[]}
   */
  async searchTracks (search) {
    if (!this.host) this.host = await getHost()

    if (!search) {
      throw Error(_prefix + ' searchTracks() expected playlist search term, but got none.')
    } else {
      const res = await fetch(this.host + `/${apiVersion}/tracks/search?${querystring.stringify({ app_name: this.appName, query: search })}`)
      const json = await res.json()
      const data = json.data

      const tracks = []
      const users = await Promise.all(data.map(p => this.getUser(p.user.id)))

      for (let i = 0; i < users.length; i++) {
        const t = data[i]
        const user = users[i]
        tracks.push(new Track(t.artwork, t.description, t.genre, t.id, t.mood, t.release_date, t.remix_of, t.repost_count, t.favorite_count, t.play_count, t.tags ? t.tags.split(',') : [], t.title, user, t.duration, t.downloadable))
      }
      return tracks
    }
  }

  /**
   * Get a track by its ID.
   * @param {string} id The ID of the track to retrieve.
   * @type {Track}
   */
  async getTrack (id) {
    if (!this.host) this.host = await getHost()

    if (!id) {
      throw Error(_prefix + ' getTrack() expected track ID, but got none.')
    } else {
      const res = await fetch(this.host + `/${apiVersion}/tracks/${id}?${querystring.stringify({ app_name: this.appName })}`)
      const json = await res.json()
      const t = json.data

      const user = await this.getUser(t.user.id)
      return t ? new Track(t.artwork, t.description, t.genre, t.id, t.mood, t.release_date, t.remix_of, t.repost_count, t.favorite_count, t.play_count, t.tags ? t.tags.split(',') : [], t.title, user, t.duration, t.downloadable) : null
    }
  }

  /**
   * Search for playlists by name.
   * @param {String} search The search term to find playlists by.
   * @type {Playlist[]}
   */
  async searchPlaylists (search) {
    if (!this.host) this.host = await getHost()

    if (!search) {
      throw Error(_prefix + ' searchPlaylists() expected playlist search term, but got none.')
    } else {
      const res = await fetch(this.host + `/${apiVersion}/playlists/search?${querystring.stringify({ app_name: this.appName, query: search })}`)
      const json = await res.json()
      const data = json.data

      const playlists = []
      const users = await Promise.all(data.map(p => this.getUser(p.user.id)))

      for (let i = 0; i < users.length; i++) {
        const p = data[i]
        const user = users[i]
        playlists.push(new Playlist(p.artwork, p.description, p.id, p.is_album, p.playlist_name, p.repost_count, p.favorite_count, p.total_play_count, user))
      }
      return playlists
    }
  }

  /**
   * Get a playlist's information.
   * @param {String} id The ID of the playlist to retrieve.
   * @type {Playlist}
   */
  async getPlaylist (id) {
    if (!this.host) this.host = await getHost()

    if (!id) {
      throw Error(_prefix + ' getPlaylist() expected playlist ID, but got none.')
    } else {
      const res = await fetch(this.host + `/${apiVersion}/playlists/${id}?${querystring.stringify({ app_name: this.appName })}`)
      const json = await res.json()

      // returning a single-item array is strange...
      // not sure why this is a special case but it is what it is, i guess
      const p = json.data[0]

      const user = await this.getUser(p.user.id)
      return new Playlist(p.artwork, p.description, p.id, p.is_album, p.playlist_name, p.repost_count, p.favorite_count, p.total_play_count, user)
    }
  }

  /**
   * Get an array of tracks from a playlist.
   * @param {String} id The ID of the playlist to retrieve
   * @type {Track[]}.
   */
  async getPlaylistTracks (id) {
    if (!this.host) this.host = await getHost()

    if (!id) {
      throw Error(_prefix + ' getPlaylistTracks() expected playlist ID, but got none.')
    } else {
      const res = await fetch(this.host + `/${apiVersion}/playlists/${id}/tracks?${querystring.stringify({ app_name: this.appName })}`)
      const json = await res.json()
      const data = json.data

      const tracks = []
      const users = await Promise.all(data.map(t => this.getUser(t.user.id)))

      for (let i = 0; i < users.length; i++) {
        const t = data[i]
        const user = users[i]
        tracks.push(new Track(t.artwork, t.description, t.genre, t.id, t.mood, t.release_date, t.remix_of, t.repost_count, t.favorite_count, t.play_count, t.tags ? t.tags.split(',') : [], t.title, user, t.duration, t.downloadable))
      }
      return tracks
    }
  }

  /**
   * Gets the top 100 trending tracks on Audius, by time range and genre.
   * @param {('week'|'month'|'allTime')} time The time frame to look for trending tracks in.
   * @param {Genres} genre The genre of music to filter tracks by.
   * @type {Track[]}
   */
  async getTrendingTracks (time, genre) {
    if (!this.host) this.host = await getHost()

    time = ['week', 'month', 'allTime'].includes(time) ? time : 'week'

    const res = await fetch(this.host + `/${apiVersion}/tracks/trending?${querystring.stringify({ app_name: this.appName, time: time, genre: genre })}`)
    const json = await res.json()
    const data = json.data

    const tracks = []
    const users = await Promise.all(data.map(t => this.getUser(t.user.id)))

    for (let i = 0; i < users.length; i++) {
      const t = data[i]
      const user = users[i]
      tracks.push(new Track(t.artwork, t.description, t.genre, t.id, t.mood, t.release_date, t.remix_of, t.repost_count, t.favorite_count, t.play_count, t.tags ? t.tags.split(',') : [], t.title, user, t.duration, t.downloadable))
    }
    return tracks
  }

  /**
   * Stream/download a track. 
   * @param {String} id The unique ID of the track to stream.
   * @param {Boolean} download Whether to return once the entire file has been downloaded or return a stream.
   * @type {Stream}
   */
  async streamTrack(id, download) {
    if(!this.host) this.host = await getHost()

    if(!id) {
      throw Error(_prefix + ' streamTrack() expected track ID, but got none.')
    } else {
      console.log("Starting to stream/download.")
      const res = await fetch(this.host + `/${apiVersion}/tracks/${id}/stream`, { method: download ? "RANGE" : "GET" })
      /** @type {Stream} */
      const body = res.body
      console.log("Returning stream.")
      return body
    }
  }

      /**
   * Resolve a provided Audius app URL to the API resource URL
   * @param {String} url The URL to resolve. Either fully provided Audius app URL
   * @type {URL}
   */
  async resolveURL(url) {
    if(!this.host) this.host = await getHost()
    
    if(!url) {
      throw Error(_prefix + " resolveURL() expected a provided Audius app URL, but got none.")
    } else {
      const res = await fetch(this.host + `/${apiVersion}/resolve?${querystring.stringify({ app_name: this.appName, url: url })}`)
      const data = res.url
      return data
    }
   }
}
