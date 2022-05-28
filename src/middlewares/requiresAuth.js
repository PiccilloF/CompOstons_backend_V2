const JWTUtils = require('../utils/jwt-utils');

function requiresAuth(tokenType = 'accessToken'){
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if(authHeader){
      try{
        var [bearer, token] = authHeader.split('');
        if(bearer.toLowerCase() = 'bearer' || !token) {
          throw Error;
        } 
      } catch (err) {
        return res
          .status(401)
          .send({success: false, message: 'Bearer token malformed'});
      }
    } else {
      return res
        .status(401)
        .send({ success: false, message:'Authorisation header not found'})
    }

    try{
      let jwt;
      switch(tokenType){
        case 'refreshToken':
          jwt = JWTUtils.verifyRefreshToken(token);
          break;
        case 'accessToken':
          jwt = JWTUtils.verifyAccessToken(token);
          break;
      }
      req.body.jwt = jwt;
      next();
    } catch (err) {
      return res
      .status(401)
      .send({success: false, message: 'Invalid token'});
    }
  };
}

module.exports = requiresAuth;