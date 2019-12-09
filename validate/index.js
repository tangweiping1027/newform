
import validRule from "./validRule"
// eslint-disable-next-line no-console
console.log(validRule)

export default function Rules(options) {
  let rule = {}
  Object.keys(options).map(item => {
    rule[item] = [{
      required: true,
      validator: (rule, value, callback) => {
        validRule[options[item].type](options[item], value, callback)
      }
    }]
  })
  return rule
}