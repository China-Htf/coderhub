// 引入 dotenv 库
const dotenv = require('dotenv')

// 默认读取项目根目录下的.env文件
dotenv.config();

// 返回一个包含用户环境信息的对象
// console.log(process.env);
// const { APP_PORT } = process.env;

// 读取到的端口号导出
module.exports = {
  // 导出的名称
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD
} = process.env;