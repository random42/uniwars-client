import { observable, extendObservable, action, computed, toJS } from 'mobx'

export class Model {

  constructor(obj, options = {
      // these values are never used by default
      // instance should be cached (true for User, Chat, Team, Uni)
      cache: true,
      // should be observable (true for Chat)
      observable: true,
    }) {
    // some good type checking
    if (!obj || typeof obj !== 'object' || !obj._id || typeof obj._id !== 'string')
      throw new Error("Cannot create model!")
    const _id = obj._id
    this._observable = options.observable
    let _class = this.constructor
    let cache = _class.cache
    if (cache && options.cache) {
      // object should be cached
      if (cache.has(_id)) {
        /*
          if the object was already in cache it will be merged
          and returned so that the new object ('this') will be garbage-collected
        */
        let cached = cache.get(_id)
        /*
          change observability of the object if necessary,
          so that new loaded properties will be observable
        */
        cached._observable = cached._observable || options.observable
        return cached.loadObject(obj)
      }
      else {
        cache.set(_id, this)
      }
    }
    this.loadObject(obj)
  }

  @action.bound loadObject(obj) {
    if (this._observable) {
      extendObservable(this, obj)
    }
    else {
      for (let i in obj)
        this[i] = obj[i]
    }
    return this
  }

  isObservable() {
    return this._observable
  }

  hasProperties(props = []) {
    for (let item of props) {
      if (this[item] === undefined)
        return false
    }
    return true
  }
}
