const { User } = require('../models');
const { sequelize } = require('../models/user');


const userController = { 

  getAllUsers: async (req, res) => {  
    try {
      const users = await User.findAll({
        attributes: ['username','email', 'role'],
        include: [
            { association: 'composts', 
              attributes: ['availability'], 
              include: 'wasteCategories',
            } ,
            { 
              association: 'articles',
              attributes: ['author','title']
          },
        ]
      });

      return res.status(200).send({data : users});
    } catch (error) {
      console.trace(error);
      res.status(500).json(error.toString());
    }
  },

  getOneUser: async (req, res) => {
    let userId = req.params.id;
    try {
      const user = await User.findByPk(userId, {
        include: [
          { association: 'composts', include: 'wasteCategories' },
          { association: 'articles' },
        ]
      });
      if (!user) {
        return res.status(404).json('Can\t find user with id:' + userId);
      }
      res.json(user);
    } catch(error) {
      console.trace(error)
      res.status(500).json(error.toString());
    }
  },

  
  updateUser: async (req,res) => {
      let userId = req.params.id;
      const t = await sequelize.transaction();
    try{
      const user = await User.findByPk(userId);

      if(!userId) {
        return res.status(401).send({ 
          success: false, 
          message:"Can't find user with id: " + userId
        });
      }

      await user.update(
      { username : req.body.username || user.username,
        firstname : req.body.firstname || user.firstname,
        lastname : req.body.lastname || user.lastname,
        email : req.body.email || user.email,
        profile : req.body.profile || user.profile,
        role : req.body.role || user.role
      }, {transaction: t});

      await t.commit();

        return res.status(200).send({
            success: true,
            message: 'User successfully updated',
          });

    } catch(error) {
      await t.rollback();
      res.status(404).json(error.toString());
    }
  },

  deleteUser: async (req, res) => {
    try{
      let userId = req.params.id;
      const user = await User.findByPk(userId);
      // We look if user id exist
      if(!userId) {
        return res.status(401).send({
          success :false, 
          message:"Can't delete user with id: " + userId});
      }
      // user is deleted
      await user.destroy();
      res.json('ok');
    } catch (error) {
      res.status(500).json(error.toString());
    }
  }
  
  
}

module.exports = userController;