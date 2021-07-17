const Router = require('koa-router')

const {
  // 上传文件存放目录
  avatarHandler
} = require('../middleware/file.middleware')

const {
  create
} = require('../controller/file.controller')

const fileRouter = new Router({prefix: '/upload'})

fileRouter.post('/',  avatarHandler, create)

module.exports = fileRouter