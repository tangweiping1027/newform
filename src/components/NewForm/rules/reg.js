import ValidationRule from './validate-rule';

class FunctionRule extends ValidationRule {
  constructor(props) {
    super(props);
    this.name = "reg";
    this.errMsg = "自定义正则表达式错误";
    this.reg = props.value
    this.func = (rule, value, cb) => {
      let reg = props.value
      if (!reg.test(value)) {
        cb(new Error(this.errCustomMsg || this.errMsg))
      }
      cb()
    }
  }
}

export default FunctionRule;
