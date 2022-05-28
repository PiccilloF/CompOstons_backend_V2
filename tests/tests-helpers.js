const Database = require('../src/database/index');
const dbConfig = require('../src/config/database');

let db;

  class TestHelpers {
  static async startDb() {
    db = new Database('test', dbConfig);
    await db.connect();
    return db;
  }

  static async stopDb() {
    await db.disconnect();
  }

  static async syncDb() {
    await db.sync();
  }
}

module.exports = TestHelpers;