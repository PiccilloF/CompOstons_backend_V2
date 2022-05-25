// environment variables are loaded as soon in the project
const environment = require('./config/environment');
const express  = require('express'); ;


// Default and set server port
const PORT = environment.port || 5050;
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing
const router = require('./src/router');
app.use(router);

// server launch
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
});
