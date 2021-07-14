const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class authController {
  async login(ctx, next) {
    const {id, name} = ctx.user;
    // 颁发签名
    const token = jwt.sign({id, name}, PRIVATE_KEY, {
      // 过期时间
      expiresIn: 60 * 60 * 24,
      // 采用的算法
      algorithm: 'RS256'
    })
    ctx.body = { id, name, token }
  }

  async success(ctx, next) {
    ctx.body = '授权成功~'
  }
}

module.exports = new authController()