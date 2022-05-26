const {Router} = require ('express');
const userController = require ('./controllers/userController');
const compostController = require ('./controllers/compostController');
const articleController = require('./controllers/articleController');
const wasteCategoryController = require('./controllers/wasteCategoryController');

const router = Router();

/*
* Home route
*/
router.get('/', (req, res) => {
  res.send('Hello World!');
});

/*
* Users routes
*/
router.get('/users', userController.getAllUsers);
router.get('/users/:id',userController.getOneUser);
router.post('/users', userController.createUser);
router.put('/users/:id',userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

/*
* Composts routes
*/
router.get('/composts', compostController.getAllcomposts);
router.get('/composts/:id', compostController.getOneCompost);
router.post('/composts', compostController.createCompost);
router.put('/composts/:id', compostController.updateCompost);
router.delete('/composts/:id', compostController.deleteCompost);
router.post('/composts/addwaste/:id', compostController.addWasteCategory);
/*
* Articles routes
*/
router.get('/articles', articleController.getAllArticles);
router.get('/articles/:id', articleController.getOneArticle);
router.post('/articles', articleController.createArticle);
router.put('/articles/:id', articleController.updateArticle);
router.delete('/articles/:id', articleController.deleteArticle);

/*
* WasteCategory routes
*/
router.get('/wasteCategories', wasteCategoryController.getAllWasteCategories);
router.post('/wasteCategories', wasteCategoryController.createWasteCategory);
router.put('/wasteCategories/:id', wasteCategoryController.modifyWasteCategory);
router.delete('/wasteCategories/:id', wasteCategoryController.deleteWasteCategory);

module.exports = router;