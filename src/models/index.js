export {Chat} from './chat'
export {User} from './user'
export {Question} from './question'
export {Team} from './team'
export {Uni} from './uni'
export {Game} from './game'

import { observable } from 'mobx'

export function createCache(_class) {
  let cache = observable(new Map())
  _class.cache = cache
  let _set = cache.set.bind(cache)
  cache.set = (key, obj) => {
    if (!obj instanceof _class)
      throw new Error("Trying to cache a wrong instance!", obj)
    return _set(key, obj)
  }
  _class.clearCache = cache.clear.bind(cache)
}

for (let i in exports) {
  createCache(exports[i])
}
