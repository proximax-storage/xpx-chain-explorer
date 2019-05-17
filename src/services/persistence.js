class Persistence {
  constructor () {
    this.storage = localStorage
  }

  get (item) {
    return this.storage.getItem(item)
    // return (typeof newItem === 'object') ? JSON.parse(newItem) : newItem
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
