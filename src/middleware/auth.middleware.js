const errorType = require("../constants/error-types");
const service = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name, password } = ctx.request.body;

  // 2. 判断用户名或者密码不能为空
  if (!name || !password) {
    // 创一个错误对象
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    console.log("发生了错误");
    // 错误信息发射出去
    return ctx.app.emit("error", error, ctx);
  }

  // 3. 判断这次注册的用户名是没有被注册过
  const result = await service.getUserByName(name);
  const user = result[0]
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  // 4.判断密码是否和数据库中的一致
  // user.password 是数据库中的密码 const user = result[0] 返回得到的
  if(md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT)
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user
  await next()
};
module.exports = {
  verifyLogin,
};
