const JWTUtils = require('../utils/jwt-utils');
const environment = require('../config/environment');

function requiresAuth (req, res, next) {
  console.log(req.headers);

  // get token from request header
  const authHeader = req.headers.authorization
  console.log(authHeader);
  if (!authHeader) {
    res.status(401).send('empty token');
    return
  }
  const token = authHeader.split('')[1];

  // the request header contains the token "Bearer <token>", split the string and use the second value in the split array.

  JWTUtils.verifyAccessToken(token, environment.jwtAccessTokenSecret, (err, user) => {
    if (err) {
      res.status(403).send('Token invalid');
    } else {
      req.user = user;
      console.log(user);
      next(); // proceed to the next action in the calling function
    }
  }
  )
};

module.exports = requiresAuth;