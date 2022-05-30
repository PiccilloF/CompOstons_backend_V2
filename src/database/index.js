const { Sequelize } = require('sequelize');
const db = require('../config/database');

  var db_env = 'test';

  switch (db_env) {
    case 'production':
      db_env = new Sequelize(db.production.database, db.production.username,db.production.password, {
        host: db.production.host,
        dialect: db.production.dialect,
        logging: false,
      });
      break;
    case 'test':
      db_env = new Sequelize(db.test.database, db.test.username,db.test.password, {
        host: db.test.host,
        dialect: db.test.dialect,
        logging:false,
      });
      break;
    default:
      db_env = new Sequelize(db.development.database, db.development.username,db.development.password, {
        host: db.development.host,
        dialect: db.development.dialect,
      });
  } 


module.exports = db_env;


/* PG database connection test */

async function connectionTest () {
    try {
    await db_env.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectionTest();

/*
async function closeConnection () {
  try {
    await sequelize.close()
    console.log('Connection has been closed successfully.')
  } catch (error) {
    console.error('Unable to close connection', error)
  }
};

function timeOutClosure () {
  setTimeout(closeConnection, 3000)
};
*/

