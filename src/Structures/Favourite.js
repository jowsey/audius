module.exports = class {
  /**
   * Defines a Favourite object.
   * @param {String} id The unique ID of the favourite.
   * @param {String} type The type of Item this favourite is.
   * @param {String} userID The unique ID of the user that made this favourite.
   */
  constructor (id, type, userID) {
    this.id = id
    this.type = type
    this.userID = userID
  }
}
