const fileservice = require("../service/file.service");


class fileController {
  async create(ctx, next) {
    // 1. 获取图像信息
    console.log(ctx.req.file);
    const {filename, mimetype, size} = ctx.req.file
    // 2. 将图像信息数据保存到数据库中
    const result = await fileservice.create(filename, mimetype, size)
    // 3.返回结果
    ctx.body = result
  }
}

module.exports = new fileController()