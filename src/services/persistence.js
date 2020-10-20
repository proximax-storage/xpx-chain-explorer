/**
 * Persistance Service
 *
 * Class that allows us to manage the data stored in LocalStorage
 */
class Persistence {
  constructor (service) {
    this.storage = service
  }

  get (item) {
    return this.storage.getItem(item)
  }

  set (name, item) {
    let filteredItem = (typeof item === 'object') ? JSON.stringify(item) : item
    this.storage.setItem(name, filteredItem)
  }

  clear () {
    this.storage.clear()
  }
}

export { Persistence }
