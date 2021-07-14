const fs = require('fs')

const useRouters = (app) => {
  // 通过 fs 模块拿到本地所有文件
  fs.readdirSync(__dirname).forEach(file => {
    // 若是 index.js 则跳出
    if(file === 'index.js') return
    // 路由模块赋值
    const router = require(`./${file}`)
    // 监控路由模块
    app.use(router.routes());
    // 路由方法
    app.use(router.allowedMethods())
  })
}

module.exports = useRouters