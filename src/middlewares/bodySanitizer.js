const sanitier = require("sanitizer");

const bodySanitizer = (req, res, next) => {
  if (req.body) {
    // if req.body property is in the request
    for (let propName in req.body) {
      // req.body values are sanitized
      req.body[propName] = sanitier.escape(req.body[propName]);
    }
  }
  // pass to the next middleware
  next();
};

module.exports = bodySanitizer;