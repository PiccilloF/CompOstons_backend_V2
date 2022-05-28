const jwt = require('jsonwebtoken');
const environment = require('../config/environment');

  class JWTUtils {
  static generateAccessToken(payload, options = {} ) {
    const {expiresIn = '24h'} = options;
    return jwt.sign(payload, environment.jwtAccessTokenSecret, {expiresIn});
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, environment.jwtRefreshTokenSecret);
  }

  static verifyAccessToken(accessToken) {
    return jwt.verify(accessToken, environment.jwtAccessTokenSecret );
  }

  static verifyRefreshToken(accessToken) {
    return jwt.verify(accessToken, environment.jwtRefreshTokenSecret );
  }
}

module.exports = JWTUtils;