export default class ValidateRule {
  constructor({ errMsg }) {
    this.name = ''
    this.errCustomMsg = errMsg
    this.rule = []
  }

  validateRule() {
    return false
  }

  get rules() {
    let validator = this.func || ((rule, val, cb) => {
      let result = this.validateRule(val)
      if (result) {
        return cb()
      } else {
        return cb(new Error(this.errCustomMsg || this.errMsg))
      }
    })
    return [
      {
        validator
      }
    ]
  }
}
