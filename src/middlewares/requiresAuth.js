const JWTUtils = require('../utils/jwt-utils');

const requiresAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(authHeader){
    try {
      // var is used instead of let or const to extend scope of values
      var [bearer, token] = authHeader.split(' ');
      if(bearer.toLowerCase() !== 'bearer' || !token){
        throw Error
      } 
    } catch (err) {
      return res.status(401).send({
        success:false, 
        message: 'Bearer token malformed'})
    }
  } else {
    return res.status(401).send({
      success: false, 
      message: 'Authorization header not found'})
  }

  try  {
    const jwt = JWTUtils.verifyAccessToken(token);
    req.body.jwt = jwt;

    next();

  } catch (err) {
    return res.status(401).send({
      success: false,
      message: 'Invalid token'
    })
  }
}

module.exports = requiresAuth;