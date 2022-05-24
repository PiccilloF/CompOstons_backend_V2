import {Router} from 'express';
import userController from './controllers/userController.js';

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

export default router