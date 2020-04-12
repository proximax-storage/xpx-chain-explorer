class Utils {
  static isHex (value) {
    const regex = /^[0-9A-Fa-f]+$/
    return regex.test(value)
  }

  static isOnlyNumber (value) {
    const regex = /^[0-9]+$/
    return regex.test(value)
  }
}

export default Utils
