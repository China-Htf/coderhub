const Router = require('koa-router')
const commentRouter = new Router({prefix: '/comment'})

const {
  // 验证授权是否有效
  verifyAuth
} = require('../middleware/auth.middleware')

const {
  create
} = require('../controller/comment.controller.js')

commentRouter.post('/', verifyAuth, create)

module.exports = commentRouter