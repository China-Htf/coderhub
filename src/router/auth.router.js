const Router = require('koa-router')

const authRouter = new Router()

const {
  // 登录模块
  login
} = require('../controller/auth.controller.js')

const {
  // 登陆之前验证
  verifyLogin
} = require('../middleware/auth.middleware')

authRouter.post('/login', verifyLogin, login)

module.exports = authRouter