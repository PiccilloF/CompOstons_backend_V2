const { User, RefreshToken } = require('../models')
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const environment = require('../config/environment');
const JWTUtils = require('../utils/jwt-utils');



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

  /* creating newUser need many controls */
  createUser: async (req, res) => {
    try {
        // Control that user doesn't already exist with unique email
        const user = await User.findOne({
          where: {
            email: req.body.email
          }
        });
        if (user) {
          return res.send({error:'cet email est deja utilisé '})
        }

        // email type validation
        if (!emailValidator.validate(req.body.email)) {
          return res.send('Cet email n\'est pas valide.')
          };

          // new password is encrypted before registering in database 
          const salt = await bcrypt.genSalt(environment.saltRounds);
          const encryptedPassword = await bcrypt.hash(req.body.password, salt);

          // Both refreshToken and accessToken were generate
          const payload = {email: req.body.email};
          const accessToken = JWTUtils.generateAccessToken(payload);
          const refreshToken = JWTUtils.generateRefreshToken(payload);

          // new instance is created in database
          const newUser = {
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: encryptedPassword,
            profile: req.body.profile,
            role: req.body.role,
            RefreshToken: {token: refreshToken}
          };
    
        
          await User.create(newUser, {include: 'Tokens'})


          return res.status(200).send({
            success: true,
            message: 'User successfully registered',
            data:{
              accessToken,
              refreshToken
            }
          })
        } catch (error) {
          res.status(404).json(error.toString());
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