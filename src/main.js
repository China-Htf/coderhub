// 导入创建的 koa 对象
const app = require('./app')
// 连接数据库
require('./app/database')

// 导入 环境变量
const config = require('./app/config')


// 监听
app.listen(config.APP_PORT, () => {
  console.log(`服务器在${config.APP_PORT}端口启动成功`);
})