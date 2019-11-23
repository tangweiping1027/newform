import ValidationRule from './validate-rule';

class TelRule extends ValidationRule {
  constructor(props) {
    super(props);
    this.name = "tel";
    this.errMsg = "手机号码填写错误";
  }

  validateRule(val) {
    if (typeof val !== "string") return true;
    return /0?(13|14|15|17|18|19)[0-9]{9}/.test(val);
  }
}

export default TelRule;
