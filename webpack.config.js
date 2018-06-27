// webapck.config.js 文件中配置如下：
const path = require('path');
const htmlPlugin = require('html-webpack-plugin')
module.exports = {
    entry: {
        index: './src/index.js' // 配置入口 JS：里面的index是文件名（可以随便写)
    }, // 入口文件的配置项：配置入口文件的地址，可以是单一入口，也可以是多入口
    output: {
        path: path.resolve(__dirname, 'dist'), // 打包的出口路径
        filename: 'bundle.js' //打包的文件名称
    }, // 出口文件的配置项：配置出口文件的地址，在webpack2.X版本后，支持多出口配置

    module: {

    }, // 配置模块：主要是解析CSS和图片转换压缩等功能

    plugins: [
        new htmlPlugin({
            minify: { // 对html文件进行压缩 的配置
                removeAttributeQuotes: true // 去掉标签上 属性的双引号
            },
            hash: true, // 加入hast，避免JS缓存
            template: './src/index.html' // 要打包的 HTML 文件路径

        })
    ], // 配置插件：根据你的需要配置不同功能的插件

    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // 服务器基本运行路径：用于找到程序打包地址
        compress: true, // 服务端压缩是否开启（服务器端压缩选型，一般设置为开启）
        host: '127.0.0.1', // 服务器的IP地址，可以使用IP也可以使用localhost
        port: 3000 // 配置服务端口号
    } // 配置webpack开发服务功能
}