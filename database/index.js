import { Sequelize } from 'sequelize';
import db from '../config/database.js';

const sequelize = new Sequelize(db.development.database, db.development.username, db.development.password, {
  host: db.development.host,
  dialect: db.development.dialect
});

console.log(db.development.database)
export default sequelize;

/* PG database connection test */

async function connectionTest () {
    try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectionTest();