const momentservice = require("../service/moment.service");

class MomentController {
  async create(ctx, next) {
    // 获取数据 id content 内容
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 将数据插入到数据库中
    const result = await momentservice.create(userId, content);

    ctx.body = result;
  }
  async detail(ctx, next) {
    // 获取用户传输过来的 Id
    const momentId = ctx.params.momentId;

    // 根据 Id 进行查询
    const result = await momentservice.getMomentById(momentId);

    ctx.body = result;
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query;

    // 根据 Id 进行查询
    const result = await momentservice.getMomentList(offset, size);

    ctx.body = result;
  }
  async update(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    // 修改内容
    const result = await momentservice.update(content, momentId);
    ctx.body = "修改完成";
  }
  async remove(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;
    const result = await momentservice.remove(momentId);
    ctx.body = "删除完成";
  }
}

module.exports = new MomentController();
