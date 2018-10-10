import { Model } from './model'
import { observable, extendObservable, action, computed, toJS } from 'mobx'

export class User extends Model {

  constructor(obj, options = { cache: true, observable: true }) {
    super(obj, options)
  }

  get fullName() {
    if (!this.hasProperties(['first_name','last_name']))
      throw new Error("Cannot compute user's full name.", this)
    return this.first_name + ' ' + this.last_name
  }

  get rating() {
    if (!this.hasProperties(['perf']))
      throw new Error("No rating found.", this)
    return this.perf.rating
  }

  getPicture(size) {

  }

  hasBasicProperties() {
    return super.hasProperties([
      '_id','username','picture','perf','uni','major'
    ])
  }

  hasFullProperties() {
    return super.hasProperties([
      '_id','username','picture','perf','uni','major','rank','teams'
    ])
  }

}
