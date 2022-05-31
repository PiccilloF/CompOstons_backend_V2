const {Router} = require ('express');
const userController = require ('./controllers/userController');
const compostController = require ('./controllers/compostController');
const articleController = require('./controllers/articleController');
const wasteCategoryController = require('./controllers/wasteCategoryController');
const authController = require('./controllers/authController');
const mailController = require('./controllers/mailController');
const requiresAuth = require('./middlewares/requiresAuth');


const router = Router();

/*
* Home route
*/
router.get('/', (req, res) => {
  res.send('Hello World!');
});

/*
* register controller
*/
router.post('/login', authController.login);
router.post('/register', authController.registerNewUser);
router.post('/logout',requiresAuth, authController.logout);

/*
* Users routes
*/
router.get('/users', userController.getAllUsers);
router.get('/users/:id',userController.getOneUser);
router.put('/users/:id',requiresAuth, userController.updateUser);
router.delete('/users/:id',requiresAuth, userController.deleteUser);

/*
* Composts routes
*/
router.get('/composts', compostController.getAllcomposts);
router.get('/composts/:id', compostController.getOneCompost);
router.post('/composts',requiresAuth, compostController.createCompost);
router.put('/composts/:id', requiresAuth, compostController.updateCompost);
router.delete('/composts/:id',requiresAuth, compostController.deleteCompost);
router.post('/composts/:id',requiresAuth, compostController.addWasteCategory);
/*
* Articles routes
*/
router.get('/articles', articleController.getAllArticles);
router.get('/articles/:id', articleController.getOneArticle);
router.post('/articles',requiresAuth, articleController.createArticle);
router.put('/articles/:id',requiresAuth, articleController.updateArticle);
router.delete('/articles/:id',requiresAuth, articleController.deleteArticle);

/*
* WasteCategory routes
*/
router.get('/wasteCategories', wasteCategoryController.getAllWasteCategories);
router.post('/wasteCategories', requiresAuth, wasteCategoryController.createWasteCategory);
router.put('/wasteCategories/:id',requiresAuth, wasteCategoryController.modifyWasteCategory);
router.delete('/wasteCategories/:id',requiresAuth, wasteCategoryController.deleteWasteCategory);

/*
* mail routes
*/
router.post('/users/:id/mail',requiresAuth, mailController.sendMail);

module.exports = router;