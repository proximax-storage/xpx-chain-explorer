// const NEM_EPOCH = Date.UTC(2015, 2, 29, 0, 6, 25, 0)

// export default {
//   fmtDate(input) {
//     let date = new Date(input*1000 + NEM_EPOCH)
//     return date.format("yyyy-MM-dd hh:mm:ss")
//   }
// }

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
      let r = "<span class='sep'><strong>" +b[0].split(/(?=(?:...)*$)/).join("</span><span class='sep'>") + "</span>"
      return r + ".</strong><span class='dim'>" + b[1] + "</span>"
    }
  }
  
  static fmtTime(data) {
		let t = (new Date(data*1000))
		var now = (new Date).getTime()
    let time = {}
    time._fmt = t.toUTCString()
    time._sec = ((now/1000) - data).toFixed(0)
    return time;
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
}

