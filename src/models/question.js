import { Model } from './model'

export class Question extends Model {

  constructor(obj, options = { cache: false, observable: false }) {
    super(obj, options)
  }

  getPicture(size) {

  }
}
