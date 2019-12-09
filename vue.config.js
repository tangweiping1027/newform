const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
module.exports = {
    configureWebpack: {

        optimization: {
          minimizer: [
            new UglifyJsPlugin({
              parallel: true,
              uglifyOptions: {
                compress: {
                  // warnings: false,
                  drop_console: true, // console
                  drop_debugger: true,
                  pure_funcs: ["console.log"] // 移除console
                }
              }
            })
          ]
        }
    }
}