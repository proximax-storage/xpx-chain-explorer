class ConvHex {
  add (x, y, base) {
    var z = []
    var n = Math.max(x.length, y.length)
    var carry = 0
    var i = 0
    while (i < n || carry) {
      var xi = i < x.length ? x[i] : 0
      var yi = i < y.length ? y[i] : 0
      var zi = carry + xi + yi
      z.push(zi % base)
      carry = Math.floor(zi / base)
      i++
    }
    return z
  }

  multiplyByNumber (num, x, base) {
    if (num < 0) return null
    if (num === 0) return []
    var result = []
    var power = x
    while (true) {
      if (num & 1) {
        result = this.add(result, power, base)
      }
      num = num >> 1
      if (num === 0) break
      power = this.add(power, power, base)
    }
    return result
  }

  parseToDigitsArray (str, base) {
    var digits = str.split('')
    var ary = []
    for (var i = digits.length - 1; i >= 0; i--) {
      var n = parseInt(digits[i], base)
      if (isNaN(n)) return null
      ary.push(n)
    }
    return ary
  }

  convertBase (str, fromBase, toBase) {
    var digits = this.parseToDigitsArray(str, fromBase)
    if (digits === null) return null
    var outArray = []
    var power = [1]
    for (let i = 0; i < digits.length; i++) {
      // invariant: at this point, fromBase^i = power
      if (digits[i]) {
        outArray = this.add(outArray, this.multiplyByNumber(digits[i], power, toBase), toBase)
      }
      power = this.multiplyByNumber(fromBase, power, toBase)
    }
    var out = ''
    for (let i = outArray.length - 1; i >= 0; i--) {
      out += outArray[i].toString(toBase)
    }
    return out
  }

  decToHex (decStr) {
    var hex = this.convertBase(decStr, 10, 16)
    return hex ? '0x' + hex : null
  }

  hexToDec (hexStr) {
    if (hexStr.substring(0, 2) === '0x') hexStr = hexStr.substring(2)
    hexStr = hexStr.toLowerCase()
    return this.convertBase(hexStr, 16, 10)
  }
}

export default ConvHex
