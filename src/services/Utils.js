/**
 * Class to format the data in the explorer
 */
export default class Utils {

  /**
   * Method to format coin
   * @param data
   * @memberof Utils
   */
  static fmtAmountValue(data) {
    if (data===null) { return }
    if (!data) {
      return "<b>0.</b><span class='dim'>000000</span>"
    } else {
      let a = data / 1000000
      let b = a.toFixed(6).split('.')
      let r = "<span class='sep'><strong>" +b[0].split(/(?=(?:...)*$)/).join("<span class='sep'>,")
      return r + ".</strong><span class='dim'>" + b[1] + "</span>"
    }
  }

  /**
   * Method to format integer with thousands separator
   * @param data
   * @memberof Utils
   */
  static fmtIntValue(data) {
    if (!data) {
      return "<b>0</b>"
    } else {
      let a = data.toString()
      let r = "<span class='sep'><strong>" + a.split(/(?=(?:...)*$)/).join("<span class='sep'>,")
      return r + "</strong>"
    }
  }

  /**
   * Method for currency format depending on the divisibility
   * @param quantity
   * @param divisibility
   * @memberof Utils
   */
  static fmtDivisibility(quantity, divisibility) {
    let init = '1'
    for(let i = 0; i < divisibility; i++) {
      init += '0'
    }
    if (!quantity || quantity === null) {
      let vacio = 0 / parseFloat(init)
      let b = vacio.toFixed(divisibility).split('.')
      let r = "<span class='sep'><strong>" +b[0].split(/(?=(?:...)*$)/).join("<span class='sep'>,")
      return r + ".</strong><span class='dim'>" + b[1] + "</span>"
    } else {
      let a = parseFloat(quantity)/parseFloat(init)
      let b = a.toFixed(divisibility).split('.')
      let r = "<span class='sep'><strong>" +b[0].split(/(?=(?:...)*$)/).join("<span class='sep'>,")
      return r + ".</strong><span class='dim'>" + b[1] + "</span>"
    }
  }

  /**
   * Method for data format
   * @param format date with class date of js
   * @memberof Utils
   */
  static fmtTime(format) {
    let date = new Date(format),
    day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate(),
    month = ((date.getMonth() + 1) < 10) ? `0${date.getMonth()+1}` : date.getMonth()+1,
    hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours(),
    minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes(),
    seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds(),
    final = `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return final
  }

  /**
   * Method to calculate the duration of a namespace
   * @param duration of namespace
   */
  static calculateDuration(duration) {
    let seconds = duration * 15;
    let days = Math.floor(seconds / (3600 * 24))
    seconds -= days * 3600 * 24
    let hrs = Math.floor(seconds / 3600)
    seconds -= hrs * 3600
    let mnts = Math.floor(seconds / 60)
    seconds -= mnts * 60
    const response = days + " days, " + hrs + " Hrs, " + mnts + " Minutes, " + seconds + " Seconds"
    return response;
  }

  static pretty(address) {
    let tmp = address.split()
  }
}

