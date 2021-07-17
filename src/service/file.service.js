const connection = require("../app/database");

class FileService {
  async create(filename, mimetype, size) {
    try {
      const statement = `INSERT INTO avatar (filename, mimetype, size)VALUES (?,?,?);`;
      const [result] = await connection.execute(statement, [filename, mimetype, size]);
      return result
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new FileService();
