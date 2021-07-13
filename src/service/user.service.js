const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, password} = user
   // 插入到数据库
   const statment = `INSERT INTO users (name, password) VALUES (?, ?);`;
   const result = await connection.execute(statment, [name, password]);
   // 将 user 存储到数据库中
   return result[0];
  }

  // 用户是否存在
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?;`;
    const result = await connection.execute(statement, [name]);

    return result[0];
  }
}

module.exports = new UserService();