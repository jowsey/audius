const fetch = require('node-fetch')
const _prefix = '\x1b[95mAudius\x1b[0m'

let API_HOST = ''

module.exports = {
  _prefix: _prefix,
  apiVersion: 'v1',
  /**
   * Get an API endpoint to send requests to.
   * @param {bool} force Whether the force request a new endpoint instead of using the cache.
   * @type {Promise}
   */
  getHost: async (force) => {
    if (!API_HOST || force) {
      const res = await fetch('https://api.audius.co')
      const json = await res.json()
      const data = json.data

      const host = data[Math.floor(Math.random() * data.length)]
      if (host) {
        API_HOST = host
        return host
      } else {
        throw Error(_prefix + " Couldn't get an API endpoint to use! Either Audius' API is down, or your device can't connect for some reason!")
      }
    } else {
      return API_HOST
    }
  }
}
