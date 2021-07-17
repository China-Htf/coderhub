const Multer = require('koa-multer')

const avatarUpload = Multer({
  // 文件存放目录 若是没有该目录 则创建一个
  dest: './uploads'
})
const avatarHandler = avatarUpload.single('avatar')

module.exports = {
  avatarHandler
}