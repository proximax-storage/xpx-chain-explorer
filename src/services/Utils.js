export default class Utils {

  constructor() {
  }

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
  
  static fmtTime(format) {
    let date = new Date(format),
    day = (date.getDate() < 10) ? `0${date.getDate()}` : date.getDate(),
    month = (date.getMonth() < 10) ? `0${date.getMonth()}` : date.getMonth(),
    hours = (date.getHours() < 10) ? `0${date.getHours()}` : date.getHours(),
    minutes = (date.getMinutes() < 10) ? `0${date.getMinutes()}` : date.getMinutes(),
    seconds = (date.getSeconds() < 10) ? `0${date.getSeconds()}` : date.getSeconds(),
    final = `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}:${seconds}`
    return final
  }

  static fmtUptime(data, end) {
    var start = data._fmt
    var end = end
    var hours = Math.floor((end - start) / 3600)
    var days = Math.floor(hours / 24)
    hours = hours -  24 * days
    return days + 'd, ' + hours + 'h '
  }
  
  static fmtNemImportanceScore(data) {
		var o = this.long2val(data)
		if (o) {
			o /= 90000
			o = o.toFixed(4).split('.')
			o = o[0] + ".<span class='dim'>" + o[1] + "</span>"
		}
		return o
  }
   
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
}

