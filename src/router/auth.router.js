const Router = require('koa-router')

const authRouter = new Router()

const {
  // 登录模块
  login,
  // 验证令牌成功
  success
} = require('../controller/auth.controller.js')

const {
  // 登陆之前验证
  verifyLogin,
  // 验证令牌
  verifyAuth
} = require('../middleware/auth.middleware')

authRouter.post('/login', verifyLogin, login)
authRouter.get('/test', verifyAuth, success) 

module.exports = authRouter