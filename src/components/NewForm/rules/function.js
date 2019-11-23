import ValidationRule from './validate-rule';

class FunctionRule extends ValidationRule {
  constructor(props) {
    super(props);
    this.name = "function";
    this.errMsg = "自定义函数错误";
    this.func = props.value
  }

}

export default FunctionRule;
