const jwt = require("jsonwebtoken");

const errorType = require("../constants/error-types");
const service = require("../service/user.service");
const authService = require("../service/auth.service");

const md5password = require("../utils/password-handle");

const { PUBLIC_KEY } = require("../app/config");

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
  const user = result[0];
  if (!user) {
    const error = new Error(errorType.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  // 4.判断密码是否和数据库中的一致
  // user.password 是数据库中的密码 const user = result[0] 返回得到的
  if (md5password(password) !== user.password) {
    const error = new Error(errorType.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  console.log("验证授权的middleware");
  // 获取token
  const authorization = ctx.headers.authorization;
  // 客户端传输过来的 前面带有 Bearer 不需要的字段 进行截取
  const token = authorization.replace("Bearer ", "");

  // 验证 token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    console.log(err);
    const error = new Error(errorType.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

const verifyPermission = async (ctx, next) => {
  console.log("验证权限的middleware");
  // 1. 获取参数
  const { momentId } = ctx.params;
  const { id } = ctx.user;

  // 2.查询是否具有权限
  try {
    const isPermission = await authService.checkMoment(momentId, id);
    // 若返回的 false 随便抛出异常 会被 catch 捕获到
    if (!isPermission) throw new Error()
    await next();
  } catch (err) {
    const error = new Error(errorType.UNPERMISSION);
    ctx.app.emit("error", error, ctx);
  }
};
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
