import { componentStatuses } from 'utils/const'
import { ValidationError } from 'utils/errors'

export class Component {
  constructor ({componentID, name, description = '', url = '', status, order = Math.floor(new Date().getTime() / 1000)}) {
    this.componentID = componentID
    this.name = name
    this.description = description
    this.url = url
    this.status = status
    this.order = order
  }

  validate () {
    if (this.componentID === undefined || this.componentID === '') {
      throw new ValidationError('invalid componentID parameter')
    }
    this.validateExceptID()
  }

  validateExceptID () {
    if (this.name === undefined || this.name === '') {
      throw new ValidationError('invalid name parameter')
    }

    if (this.description === undefined) {
      throw new ValidationError('invalid description parameter')
    }

    if (this.url === undefined) {
      throw new ValidationError('invalid url parameter')
    }

    if (componentStatuses.indexOf(this.status) < 0) {
      throw new ValidationError('invalid status parameter')
    }

    if (this.order === undefined || (typeof this.order !== 'number') || Math.floor(this.order) !== this.order) {
      throw new ValidationError('invalid order parameter')
    }
  }

  setComponentID (componentID) {
    this.componentID = componentID
  }

  objectify () {
    const { componentID, name, description, url, status, order } = this
    return { componentID, name, description, url, status, order }
  }
}
