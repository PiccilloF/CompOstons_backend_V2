const {Router} = require ('express');
const userController = require ('./controllers/userController');

const router = Router();
/*
* User route
*/
router.get('/users', userController.getAllUsers);
router.get('/users/:id',userController.getOneUser);
router.post('/users', userController.createUser);
router.put('/users/:id',userController.updateUser);
router.delete('/users/:id', userController.deleteUser)
/*
* Home route
*/
router.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = router;