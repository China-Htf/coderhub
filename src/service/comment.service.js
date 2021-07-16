const connection = require('../app/database')

class CommentService { 
  async create(momentId, content, userId) {
    // 添加的 sql 语句
    const statment = `INSERT INTO comment (content, moment_id, users_id)VALUES (?,?,?);`;
    // 执行 sql 语句
    const [result] = await connection.execute(statment, [content, momentId, userId])
    return result
  }
}

module.exports = new CommentService()