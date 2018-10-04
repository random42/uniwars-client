import { Model } from './model'

export class User extends Model {

  constructor(obj, options = { cache: true, observable: true }) {
    super(obj, options)
  }

  getPicture(size) {

  }

}
