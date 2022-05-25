const {Router} = require ('express');
const userController = require ('./controllers/userController');

const router = Router();
/*
* User route
*/
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
/*
* Home route
*/
router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;