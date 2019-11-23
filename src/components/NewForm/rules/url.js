import ValidationRule from './validate-rule';

class UrlRule extends ValidationRule {
  constructor(props) {
    super(props);
    this.name = "url";
    this.errMsg = "请输入正确的网址";
  }

  validateRule(val) {
    if (typeof val !== "string") return true;
    return /^((https|http)?:\/\/)[^\s]+/.test(
      val
    );
  }
}

export default UrlRule;
