const connection = require('../app/database')

class MomentService {
  async create(userId, content) {
    // 添加的 sql 语句
    const statment = `INSERT INTO moment (content, user_id)VALUES (?,?);`;
    // 执行 sql 语句
    const [result] = await connection.execute(statment, [content, userId])
    return result
  }
  async getMomentById(id) {
    console.log(id);
    // 查询的 sql 语句
    // LEFT JOIN 左边表数据全部显示 右边表有匹配项则显示
    const statment = `
      SELECT
        # 查询出来的字段 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        # 用户表以 json 格式展示 user 是显示的别名
        JSON_OBJECT('id', u.id, 'name', u.name) user
      # 查询 moment 表
      FROM moment m
      # 根据左表的 user_id 进行匹配
      LEFT JOIN users u ON m.user_id = u.id
      WHERE m.id = ?
    `;
    // 执行 sql 语句
    const [result] = await connection.execute(statment, [id])
    // 返回的是一个数组
    return result[0]
  }
  async getMomentList(offset, size) {
    // 查询的 sql 语句
    // LEFT JOIN 左边表数据全部显示 右边表有匹配项则显示
    const statment = `
      SELECT
        # 查询出来的字段 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        # 用户表以 json 格式展示 user 是显示的别名
        JSON_OBJECT('id', u.id, 'name', u.name) user
      # 查询 moment 表
      FROM moment m
      # 根据左表的 user_id 进行匹配
      LEFT JOIN users u ON m.user_id = u.id
      LIMIT ?, ?;
    `;
    // 执行 sql 语句
    const [result] = await connection.execute(statment, [offset, size])
    // 返回的是一个数组
    return result
  }
  async update(content, momentId) {
    const statement =`UPDATE moment SET content = ? WHERE id =?;`
    const [result] = await connection.execute(statement,[content, momentId])
    return result
  }
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement,[momentId])
    return result
  }
}

module.exports = new MomentService()
