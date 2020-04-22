class Utils {
  static isHex (value) {
    const regex = /^[0-9A-Fa-f]+$/
    return regex.test(value)
  }

  static isOnlyNumber (value) {
    const regex = /^[0-9]+$/
    return regex.test(value)
  }

  static fmtAmount (amount, divisibility, object = false) {
    let divisor = ['1']

    if (divisibility > 0) {
      for (let i = 1; i <= divisibility; i++) {
        divisor.push('0')
      }
      divisor = parseInt(divisor.join(''))
      amount = (amount / divisor).toFixed(divisibility)
      console.log(amount)
    }

    if (object) {
      const divAmount = amount.toString().split('.')
      console.log(divAmount)
      amount = {
        partA: divAmount[0],
        partB: (divAmount[1] !== undefined) ? divAmount[1] : null
      }
    }
    console.log(amount)
    return amount
  }

  static beautyInteger (number) {
    const result = []
    let indicator = 1
    if (typeof number === 'number') {
      number.toString()
    }
    number = number.split('')
    number.reverse()
    for (let i = 0; i < number.length; i++) {
      if (indicator % 3 === 0) {
        result.push(number[i])
        if (i + 1 !== number.length) {
          result.push(',')
        }
      } else {
        result.push(number[i])
      }
      indicator++
    }
    result.reverse()
    return result.join('')
  }

  static validateIsMosaics (id) {
    const bits = 0x7FFFFFFF
    return (id.higher | bits) === bits
  }
}

export default Utils
