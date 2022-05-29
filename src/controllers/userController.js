const { User } = require('../models');


const userController = { 

  getAllUsers: async (req, res) => {  
    try {
      const users = await User.findAll({
        include: [
            { association: 'composts', include: 'wasteCategories' },
            { association: 'articles' },
        ]
      });

      res.json(users);
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
    try{
      const user = await User.findByPk(userId);

      if(!userId) {
        return res.status(404).json("Can't find user with id: " + userId);
      }

      user.update(
        user.username = req.body.username || user.username,
        user.firstname = req.body.firstname || user.firstname,
        user.lastname = req.body.lastname || user.lastname,
        user.email = req.body.email || user.email,
        user.profile = req.body.profile || user.profile,
        user.role = req.body.role || user.role
      );

      const updatedUser = await user.save();
      res.json(updatedUser);
    } catch(error) {
      res.status(404).json(error.toString());
    }
  },

  deleteUser: async (req, res) => {
    try{
      let userId = req.params.id;
      const user = await User.findByPk(userId);
      // We look if user id exist
      if(!userId) {
        return res.status(404).json("Can't delete user with id: " + userId);
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