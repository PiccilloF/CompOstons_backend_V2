import User  from '../models/user.js';
import bcrypt from 'bcrypt';
import emailValidator from 'email-validator';
import environment from '../../config/environment.js';

const userController = { 

  getAllUsers: async (req, res) => {  
    try {
      const users = await User.findAll({
        include: [
            { association: 'composts', include: 'wastes' },
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
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (user) {
        res.send('Cet email est déjà utilisé par un utilisateur');
      }
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

export default userController;