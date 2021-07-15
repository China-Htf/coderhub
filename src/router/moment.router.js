const Router = require('koa-router')

const momentRouter = new Router({prefix: '/moment'})

const {
  // 添加进数据库的方法
  create,
  // 查询单条数据
  detail,
  // 查询多条数据
  list,
  // 修改数据
  update,
  // 删除数据
  remove
} = require('../controller/moment.controller')

const {
  // 验证 token 是否有效
  verifyAuth,
  // 验证是否拥有权限操作文章
  verifyPermission
} = require('../middleware/auth.middleware')

momentRouter.post('/', verifyAuth, create) 
momentRouter.get('/:momentId', detail) 
momentRouter.get('/', list) 

// 1.用户必须登录 2. 用户具备权限
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)

module.exports = momentRouter