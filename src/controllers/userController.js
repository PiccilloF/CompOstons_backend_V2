const { User } = require('../models')
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const environment = require('../../config/environment');

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

  /* creating newUser need many controls */
  createUser: async (req, res) => {
    try {
        if (!emailValidator.validate(req.body.email)) {
          return res.send('Cet email n\'est pas valide.')
          };
        
          const salt = await bcrypt.genSalt(environment.saltRounds);
          const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    
          const newUser = new User({
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: encryptedPassword,
            profile: req.body.profile
          });

          console.log(req.body.username)
          
          await User.create(newUser);
          res.json(newUser)
        } catch (error) {
          res.status(404).json(error.toString());
        }
  }
  
  
}

module.exports = userController;