import ValidationRule from './validate-rule';

class EmailRule extends ValidationRule {
  constructor(props) {
    super(props);
    this.name = "email";
    this.errMsg = "邮箱格式错误";
  }

  validateRule(val) {
    if (typeof val !== "string") return true;
    return /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/.test(
      val
    );
  }
}

export default EmailRule;
