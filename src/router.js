const {Router} = require ('express');
const userController = require ('./controllers/userController');
const compostController = require ('./controllers/compostController');

const router = Router();

/*
* Home route
*/
router.get('/', (req, res) => {
  res.send('Hello World!');
});

/*
* User routes
*/
router.get('/users', userController.getAllUsers);
router.get('/users/:id',userController.getOneUser);
router.post('/users', userController.createUser);
router.put('/users/:id',userController.updateUser);
router.delete('/users/:id', userController.deleteUser)

/*
* Compost routes
*/
router.get('/composts', compostController.getAllcomposts);
router.get('/composts/:id', compostController.getOneCompost);
router.post('/composts', compostController.createCompost);
router.put('/composts/:id', compostController.updateCompost);
router.delete('/composts/:id', compostController.deleteCompost)

module.exports = router;