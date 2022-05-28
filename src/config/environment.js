// Global environment variables file
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: parseInt(process.env.PORT) || 8080,
  saltRounds: parseInt(process.env.SALT_ROUNDS) || 10,
  jwtAccessTokenSecret: 
  process.env.JWT_ACCESS_TOKEN_SECRET || 
  '7db9f8f494981d2311d38ff76b40cc6ac8d1a27951395e7f13dc92defa36e3d6',
  jwtRefreshTokenSecret:
  process.env.JWT_REFRESH_TOKEN_SECRET || 
  'b4ee1ba4881d01beac71805953b1130c376c4dff7d3325a47e2a53a15d3b9714'
}