const { User, RefreshToken } = require('../models');
const JWTUtils = require('../utils/jwt-utils');
const bcrypt = require('bcrypt');
const environment = require('../config/environment');

const authController = {
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
          return res
            .status(200)
            .send({success:false, message:'cet email est deja utilisé '})
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
          };
    
          
          const registeredUser = await User.create(newUser);

          // When user is registered, new refresh token was ceated to
          await RefreshToken.create({
            token: refreshToken,
            UserId: registeredUser.id
          });
    
          return res.status(200).send({
            success: true,
            message: 'User successfully registered',
            data: {
              accessToken,
              refreshToken
            }
          })
        } catch (error) {
          res.status(404).json(error.toString());
        }
  },

  login: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
      try {

      if (!email || !password) {
        return res.status(400).send({
          success: false,
          message: 'Veuillez renseigner tous les champs'
        });
      }
      const user = await User.findOne({
        where:{email}
      });
      
      const userRefreshToken = await RefreshToken.findOne({
        where:{UserId: user.id}
      });
      
      // compare clear password with encrypted password
      const clearPassword = await bcrypt.compare(password, user.password);

      if (!clearPassword) {
        res.status(400).send({
          success: false,
          message: 'Mauvais mot de passe'
        });
        return;
      }
      
      const payload = {email}
      const accessToken = JWTUtils.generateAccessToken(payload);

      // if user doesn't have a saved refreshToken
      let refreshToken;      
      if(!userRefreshToken || !userRefreshToken.token ){
        refreshToken = JWTUtils.generateRefreshToken(payload);
        await RefreshToken.create({
          token: refreshToken,
          UserId: user.id
        });
      } else {
        refreshToken = userRefreshToken.token;
      } 
    
      return res.status(200).send({
            success: true,
            message: 'Utilisateur connecté',
            data:{
              accessToken,
              refreshToken,
              user: email
            }
          });

    } catch (err) {
      console.log(err);
      res.status(400).send({
        success: false,
        message: 'Mauvais email'
      });
    }
  },

  logout: async(req, res) => {
    const {email} = req.body;
      const user = await User.findOne({where: {email}});
    
      await RefreshToken.update({token : null}, {where: {UserId: user.id}});

      return res.status(200).send({
        success: true, 
        message: 'Utilisateur déconnecté'
      })
    
  }

};

module.exports = authController;