// The DB environment variables to manage connection 
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  production: {
    username: process.env.DB_PRODUCTION_USERNAME || 'postgres',
    password: process.env.DB_PRODUCTION_PASSWORD || 'postgres',
    host: process.env.DB_PRODUCTION_HOST || 'localhost',
    port: parseInt(process.env.DB_PRODUCTION_PORT) || 5432,
    database: process.env.DB_PRODUCTION_DATABASE || 'postgres',
    dialect: 'postgres'
  },
  development: {
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5432,
    database: process.env.DB_DATABASE || 'postgres',
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_TEST_USERNAME || 'postgres',
    password: process.env.DB_TEST_PASSWORD || 'postgres',
    host: process.env.DB_TEST_HOST || 'localhost',
    port: parseInt(process.env.DB_TEST_PORT) || 5432,
    database: process.env.DB_TEST_DATABASE || 'postgres',
    dialect: 'postgres'
  }
}
