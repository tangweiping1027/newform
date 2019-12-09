class InitRule {
  constructor() {
    this.rules = []
    this.instance = null
  }
  addRule(condition, msg) {
    this.rules.push({
      condition,
      msg
    })
  }
  calculateStr(rule) {  
    //  设置判断规则字符串
    let strStart = `if (value == '' || value == undefined) {cb(new Error('${rule.label}不能为空'))}`
    let strEnd = `else{cb()}`
    let strMid = ``
    let str = ""
    this.rules.forEach(item => {
      var msg = item.msg.replace(/\$_/g, rule.label)
      strMid += `else if(${item.condition}) {cb(new Error('${msg}'))}`
    })
    str = strStart + strMid + strEnd
    return this.instance = str
  }
  setRule(rule, value, cb) {
    new Function("value", "cb", this.instance || this.calculateStr(rule))(
      value,
      cb
    )
  }
}

export default InitRule
