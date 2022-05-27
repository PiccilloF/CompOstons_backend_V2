// environment variables are loaded as soon in the project
const environment = require('./src/config/environment');
const express  = require('express'); ;
const router = require('./src/router');
const bodySanitizer= require('./src/middlewares/bodySanitizer')

// Default and set server port
const PORT = environment.port || 5050;
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware to sanitize req.body before register
app.use(bodySanitizer);
// routing
app.use(router);

// server launch
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});
