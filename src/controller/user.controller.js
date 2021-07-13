// 引入创建用户模块
const service = require('../service/user.service.js')

// 创建 UserController 类
class UserController {
  async create(ctx, next) {
    // 获取用户请求传递的参数
    const user = ctx.request.body;
    // 查询数据
    const result = await service.create(user);

    // 返回数据
    ctx.body = result;
  }
}

// new 一个 UserController 对象
module.exports = new UserController();