// 引入 mysql2
const mysql = require('mysql2')
// 引入设置的数据库
const config = require('./config')

// 创建连接池
const connections = mysql.createPool({
  // 主机
  host: config.MYSQL_HOST,
  // 端口号
  port: config. MYSQL_PORT,
  // 数据库名称
  database: config.MYSQL_DATABASE,
  // 数据库用户
  user: config.MYSQL_USER,
  // 数据库密码
  password: config.MYSQL_PASSWORD
})

// 测试是否连接成功
connections.getConnection((err, conn) => {
  conn.connect((err) => {
    if(err) {
      console.log("数据库连接失败", err);
    } else {
      console.log("数据库链接成功");
    }
  })
})

// 测试链接数据库方法 通过 promise 导出
module.exports = connections.promise();