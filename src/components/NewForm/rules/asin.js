import ValidationRule from './validate-rule';

class AsinRule extends ValidationRule {
  constructor(props) {
    super(props);
    this.name = "asin";
    this.errMsg = "ASIN须为10位数，纯数字或大写字母和数字的组合";
  }

  validateRule(val) {
    if (typeof val !== "string") return true;
    return /^(?=.*?[A-Z])(?=.*?[0-9])[A-Z0-9]{10,10}$|^[0-9]{10,10}$/.test(
      val
    );
  }
}

export default AsinRule;
