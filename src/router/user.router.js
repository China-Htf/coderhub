// 引入 koa-router
const Router = require('koa-router')

// 配置默认请求前缀
const userRouter = new Router({prefix: '/users'})

// 配置注册用户模块
const {
  create
} = require('../controller/user.controller.js')
// 验证用户提交数据
const {
  verifyUser,
  // 密码进行加密
  handlePassword
} = require('../middleware/user.middleware')

// 创建用户 post 请求
userRouter.post('/', verifyUser, handlePassword,create)

module.exports = userRouter