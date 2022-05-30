const { User, RefreshToken } = require('../models');
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
    
        
          await User.create(newUser, {include: 'tokens'})


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

  login: async (req, res) => {
    const email = req.body.email
    const password = req.body.password;

     
     try {

      if (!email || !password) {
        return res.send('veuillez renseigner tous les champs')
      }
      const user = await User.findOne({where:{email}, include: 'tokens' });

      // compare clear password with encrypted password
      const clearPassword = await bcrypt.compare(password, user.password);

      if (!clearPassword) {
        res.status(400).send('erreur lors de la saisie du mot de passe ');
        return;
      }
      
      const payload = {email}
      const accessToken = JWTUtils.generateAccessToken(payload);
      const refreshToken = JWTUtils.generateRefreshToken(payload);
    
      return res.status(200).send({
            success: true,
            message: 'User successfully logged',
            data:{
              accessToken,
              refreshToken,
              user: email
            }
          })

    } catch (err) {
      console.log(err);
      res.status(400).send('erreur lors de la saisie de votre email et/ou mot de passe');
    }
  },

};

module.exports = registerController;