一、什么是 webpack
webpack 可以粗暴的理解为：模块打包机

打包：将多个文件 打包成 一个文件，减少服务器压力和下载带宽

转换：预编译语言

优化：性能优化


安装：

全局安装 webpack： npm i webpack -g

局部安装 webpack： npm i webpack --save-dev

注意：全局安装是可以的，但是webpack官方是不推荐的。这会将您项目中的 webpack 锁定到指定版本，并且在使用不同的 webpack 版本的项目中，可能会导致构建失败

安装 webapck 出现问题 检查

node版本：更新 node 版本
网络问题：淘宝镜像安装
权限问题：命令行前面加 sudo
webpack 中文网

二、开发环境 、生产环境
开发环境： dev 顾名思义，开发环境，就是项目处于开发阶段时的环境

生产环境： prod 生产环境就是真实环境，是项目处于部署阶段，是线上用户直接接触的产品环境；其性能非常重要，直接影响用户体验

三、 webpack Loaders
概述： Loaders是Webpack最重要的功能之一，所谓loader就是 webpack 的文件处理方法，通过使用不同的 Loader，webpack 可对不同的文件进行特定的处理

举例说明 不同loader的作用

可将 SASS 文件转成 CSS文件

可将 ES6、ES7代码，转成 大多数浏览器识别的JS代码

注意：

所有的 loader都需要在npm中安装，并需要在 webpack 配置文件中进行配置

loader使用时不需要用require引入（插件 plugin 才需要使用require引入）

loaders 简单配置 如下：

test：用于匹配处理文件的扩展名 的正则表达式 【正则，必需】：

对： test: /\.(png|jpg|gif)/ ；
错： test: /\.(png | jpg | gif)/
use： loader 名称及配置项的集合 【数组，必需】

include/exclude： 手动添加必须处理的文件（文件夹），或 屏蔽处理的文件（文件夹）【可选】

query： 为loaders提供额外的设置选项 【可选】

四、 webpack 插件
注意：

所有的插件都需要 require() 引入，并配置

一部分插件是 webpack 内部集成的，不用 npm 下载；大部分插件都需要 npm 下载

五、webpack 构建一个 简单的 demo（基于 webpack 3.10.0 版本）
1. demo 功能 说明
可实现功能：

HTML、JS 代码 的 编写、打包

CSS 内联、行内样式的编写（不含背景图）

本地服务热更新：启动本地服务后，修改代码，页面自动刷新

未实现功能：

未实现：CSS 外联样式的编写

未实现：图片的使用（HTML 中 img 标签的使用、CSS 中背景图的使用）

2. demo 结构 说明
src 文件夹 （新建）：开发环境的代码

dist 文件夹 （不用自己建，打包后自动生成）：生产环境的代码

node_modules 文件夹 （自动生成）：存放 项目的依赖模块

webpack.config.js 文件 （新建）：webpack 配置文件

package.json 文件 （npm init 后自动生成）：项目描述文件

第1步：初始化 并 本地安装webpack
新建一个文件夹，执行初始化命令 npm init

本地安装 webpack，执行命令：npm install webpack@3.10.0 --save-dev

第2步：新建 入口HTML 、入口JS
入口HTML： 在 src文件夹下，新建 index.html 文件，书写 HTML 代码

入口JS： 在 src文件夹下，新建 index.js 文件，书写 JS 代码

注意：

入口HTML 中不需要引入 入口JS，因为 webapck打包时，会自动引入

入口文件的文件名自定义，但要保持与 webpack.config.js 文件（webpack 配置文件）中 的入口文件名一致

第3步：webpack 配置文件：基本结构 、入口 出口的配置
（1）根目录下，新建文件 webpack.config.js
// webapck.config.js 文件中配置如下：

module.exports={
    entry:{},   // 入口文件的配置项：配置入口文件的地址，可以是单一入口，也可以是多入口

    output:{},  // 出口文件的配置项：配置出口文件的地址，在webpack2.X版本后，支持多出口配置

    module:{},  // 配置模块：主要是解析CSS和图片转换压缩等功能

    plugins:[], // 配置插件：根据你的需要配置不同功能的插件

    devServer:{}    // 配置webpack开发服务功能
}

（2）入口配置： 
指明 webpack 要打包哪一个文件
// webapck.config.js 文件中配置如下：

entry:{
    index:'./src/index.js'  // 配置入口 JS：里面的index是文件名（可以随便写)
}

（3）出口配置： 
指明 打包后文件的输出路径、文件名
// webapck.config.js 文件中配置如下：


const path = require('path');


output:{
    path:path.resolve(__dirname,'dist'),    // 打包的出口路径

    filename: 'bundle.js'    //打包的文件名称
}

（4）多入口、多出口 配置：（可选）
const path = require('path');
module.exports={
    entry:{
        entry:'./src/index.js',

        entry2:'./src/index2.js'    // 新增：入口
    },
    output:{
        path:path.resolve(__dirname,'dist'),

        filename:'[name].js'        // 更新：出口文件名
    },
    module:{},
    plugins:[],
    devServer:{}
}


第4步：配置插件：HTML 打包 —> html-webpack-plugin
引入插件：
// webpack.config.js 文件中配置如下
const htmlPlugin= require('html-webpack-plugin');
1
2
安装插件： 需要安装，因为webpack版本里没有内部集成，执行安装命令如下：

安装命令： npm install html-webpack-plugin@2.30.1 --save-dev

配置插件：

// webapck.config.js 文件中配置如下：

plugins:[
    new htmlPlugin({
        minify:{                                // 对html文件进行压缩 的配置
            removeAttributeQuotes:true          // 去掉标签上 属性的双引号
        },
        hash: true,                             // 加入hast，避免JS缓存
        template:'./src/index.html'             // 要打包的 HTML 文件路径

    })
]

命令

第5步：webpack 打包 —> 生产环境代码
解释打包： Webpack在生产环境中有一个重要的作用就是减少http的请求数，就是把多个文件打包到一个js里，这样请求数就可以减少很多

执行打包命令：

方法一： 若全局安装了 webpack， 执行命令 webapck 即可进行打包

方法二： 若局部安装了 webpack，需如下配置，再执行 npm run build 即可进行打包

// package.json 中配置如下

"script": {
    "build": "webpack"
}

执行命令 npm run build， 打包后生成文件到 dist 文件夹中（生产环境的代码）
第6步：配置开发服务：服务、热更新 —> webpack-dev-server
（1）服务安装： 如下，使用 webpack-dev-server 实现启动服务

webpack-dev-server 是一个小型的 Node.js Express服务器

安装： npm install webpack-dev-server@2.11.1 --save-dev

（2）服务配置：

// webpack.config.js 文件中配置如下

devServer:{                 // 开发环境：服务配置
    contentBase: path.resolve(__dirname,'dist'),    // 服务器基本运行路径：用于找到程序打包地址

    compress:true,          // 服务端压缩是否开启（服务器端压缩选型，一般设置为开启）

    host:'localhost',       // 服务器的IP地址，可以使用IP也可以使用localhost

    port:3000               // 配置服务端口号
}

// package.json 文件中配置如下

"scripts": {
    "server":"webpack-dev-server"
 },

（3）启动本地服务器：

执行命令：npm run serve，成功运行后，在浏览器输入 http://localhost:3000 即可看到页面
（4）热更新：

启动 npm run serve 后，会有一种监控机制的（也叫watch）；能够检测到代码的改变，并立即在浏览器中更新

以上描述，就是 热更新；webapck 3.6版本 支持了热更新（低版本 webpack 还需要进行其他配置，才能实现热更新）

相关代码
package.json 文件如下：
{
  "name": "webpack-basic",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack",
    "server": "webpack-dev-server"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^2.30.1",
    "webpack": "^3.10.0",
    "webpack-dev-server": "^2.11.1"
  }
}



webpack 配置文件 webpack.config.js 代码如下：
const path = require('path');
const htmlPlugin = require('html-webpack-plugin')


module.exports = {
    entry: {
        path: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {

    },
    plugins: [
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),   // 服务路径
        compress: true,                                 // 压缩
        host: '127.0.0.1',
        port: 3000
    }
}