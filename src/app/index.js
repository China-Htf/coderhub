// 引入 koa 库
const Koa = require('koa')
// 引入解析 JSON 第三方库
const bodyParser = require('koa-bodyparser')

// 引入userRouter路由模块
const userRouter = require('../router/user.router.js')
// 引入错误信息常量模块
const errorHandlder = require('./error-handle')

// 创建一个 koa 对象
const app = new Koa()

// 全局解析
app.use(bodyParser())
// 使用创建的接口
app.use(userRouter.routes())
// 若是请求 没有编写的接口 给用户返回错误
app.use(userRouter.allowedMethods())

app.on('error', errorHandlder)

// koa 对象导出
module.exports = app;