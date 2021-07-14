const fs = require('fs')
const path = require('path')

// 引入 dotenv 库
const dotenv = require('dotenv')

// 默认读取项目根目录下的.env文件
dotenv.config();

// 读取公钥和私钥
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))


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

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY