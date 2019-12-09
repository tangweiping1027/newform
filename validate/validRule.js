import InitValidate from "./InitValidate"

let validRule = {}
const requireComponent = require.context(
  // 其组件目录的相对路径
  "./rules/",
  // 是否查询其子目录
  true,
  // 匹配基础组件文件名的正则表达式
  /\w+\.js$/
)
 var getSingle = function(fn) {
   var result
   return function() {
     return result || fn.apply(this, arguments)
   }
 }
requireComponent.keys().forEach(fileName => {
  // 获取rule类型js
  let ruleFile = requireComponent(fileName)
  ruleFile = ruleFile.default || ruleFile
  fileName = fileName.split("/").pop().replace(/\.\w+$/, '')

  function setOption(rule) {
    var rules = new InitValidate()
    var rulesArr = []
    var agsRules = rule.rules
    agsRules && agsRules.length && (rulesArr = [...agsRules])
    ruleFile && ruleFile.length && [].push.apply(rulesArr, ruleFile)
    
    rulesArr.forEach(item => {
      rules.addRule(item.rule, item.msg)
    })
    return rules
  }
  var singleSetOption = getSingle(setOption)

  validRule[fileName] = function(...ags) {
    singleSetOption(ags[0]).setRule(...ags)
  }

})

export default validRule