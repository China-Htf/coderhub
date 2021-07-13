const errorType = require('../constants/error-types')
const service = require('../service/user.service')

const verifyUser = async (ctx, next) => {
  //  1. 获取用户名和密码
  const { name, password } = ctx.request.body;
  console.log(name, password);

  // 2. 判断用户名或者密码不能为空
  if(!name || !password || name === '' || password === '') {
    // 创一个错误对象
    const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED);
    console.log('发生了错误');
    // 错误信息发射出去
    return ctx.app.emit('error', error, ctx);
  }

  // 3. 判断这次注册的用户名是没有被注册过
  const result = await service.getUserByName(name)
  if(result.length) {
    const error = new Error(errorType.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx);
  }
  await next();
}

module.exports = {
  verifyUser
}