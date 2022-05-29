const { User } = require('../models');
const JWTUtils = require('../utils/jwt-utils');
const bcrypt = require('bcrypt');
const environment = require('../config/environment');

const registerController = {
  /* creating newUser need many controls */
  registerNewUser: async (req, res) => {
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

          // new password is encrypted before registering in database 
          const salt = await bcrypt.genSalt(environment.saltRounds);
          const encryptedPassword = await bcrypt.hash(req.body.password, salt);

          // Both refreshToken and accessToken are generated
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

};

module.exports = registerController;