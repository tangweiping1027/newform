import * as allRules from './rules';
export default class AllRules {
  constructor() {
    this.allRules = allRules
  }
  registerRule({ name, rule }) {
    if (Object.keys(this.allRules).indexOf(name) > -1) {
      throw new Error(`验证规则命名:${name} 已存在，请重命名`)
    }
    this.allRules.push({ name, rule })
  }
}
