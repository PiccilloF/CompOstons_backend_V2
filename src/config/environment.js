// Global environment variables file
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  nodenv : process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 8080,
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtRefreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET 
}