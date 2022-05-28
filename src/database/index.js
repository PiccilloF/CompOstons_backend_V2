const { Sequelize } = require('sequelize');
const db = require('../config/database');


  const development = new Sequelize(db.development.database, db.development.username,db.development.password, {
    host: db.development.host,
    dialect: db.development.dialect,
    logging:false,
  });

  const test = new Sequelize(db.test.database, db.test.username,db.test.password, {
    host: db.test.host,
    dialect: db.test.dialect,
    logging:false,
  });


module.exports = test;


/* PG database connection test */

async function connectionTest () {
    try {
    await test.authenticate();
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

