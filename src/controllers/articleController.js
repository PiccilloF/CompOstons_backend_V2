const { Article, User } = require('../models');
const { sequelize } = require('../models/user');

const articleController = {
  getAllArticles: async (req, res) => {
    try {
      const articles = await Article.findAll({
        include: {
          association: 'redacteur'
        }
      });
      res.json(articles);
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneArticle: async (req, res) => {
    let articleId = req.params.id;
    try {

      const article = await Article.findByPk(articleId, {
        include: {
          association: 'redacteur'
        }
      });

      if(!article) {
        return res.status(404).json("Can't find article with id: " + articleId); 
      }
      
      res.json(article);
    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

  createArticle: async (req, res) => {
    let userId = req.body.UserId;
    const t = await sequelize.transaction();
    try {
      const user = await User.findByPk(userId);
      if (userId != user.id) {
        res.status(404).json('there is no user with id' + userId)
      } 
      // Only administrators can post articles
      if (user.role != "administrateur") {
        res.status(404).json('You are not aload to post article');
      } else {

        await Article.create({
          author: req.body.author,
          title: req.body.title,
          picture: req.body.picture,
          picture_alt: req.body.picture_alt,
          description: req.body.description,
          UserId: req.body.UserId
        }, {transaction: t});
        
        await t.commit();
      }      

      return res.status(200).send({
        success: true,
        message: 'Article successfully created',
      })

    } catch (error) {
      await t.rollback();
      res.status(500).json(error.toString());
    }
  },

  updateArticle: async (req, res) => {
    let articleId = req.params.id;
    const t = await sequelize.transaction();
    try {
      const {
        author, 
        title, 
        picture, 
        picture_alt, 
        description
      } = req.body;

      const article = await Article.findByPk(articleId);
      if(!article) {
        return res.status(404).json('can\'t find article with id:'+ articleId); 
      };

      // if article was found, it was updated
      await article.update({
      author : author || article.author,
      title : title || article.title,
      picture : picture ||  article.picture,
      picture_alt : picture_alt || article.picture_alt,
      description : description || article.description
    }, {transaction: t})

      await t.commit();

      res.status(200).send({
        success: true,
        message: 'Article successfully updated',
      })

    } catch (error) {
      res.status(500).json(error.toString());
    }
  },

  deleteArticle: async (req, res) => {
    let articleId = req.params.id;
    try {
      const article = await Article.findByPk(articleId);
      if(!article) {
        return res.status(404).json("Can't find article with id: " + articleId);
      }

      await article.destroy();
      res.json('Article deleted !');

    } catch (error) {
      res.status(500).json(error.toString());
    }
  }

  
}

module.exports = articleController;
