const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/index');
//defining user Model

  class User extends Model{

    toJSON() {
      return {...this.get(), id: undefined}
    }
  }
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      validate:{
        len: {
          args: [2, 50],
          msg : 'Username must contain between 2 and 50 characters'
        },
      },
    },
    firstname: {
      type: DataTypes.STRING(50),
      validate: {
        len: {
          args: [2, 50],
          msg: 'Firstname must contain between 2 and 50 characters'
        },
      },
    },
    lastname: {
      type: DataTypes.STRING(50),
      validate: {
        len: {
          args: [2, 50],
          msg: 'Lastname must contain between 2 and 50 characters'
        },
      },
    },
    email: {
      type :DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail:{
          msg: 'Not a valid email address'
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile:{
      type: DataTypes.STRING,
      allowNull:false,
      defaultValue: 'chercheur',
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'user',
    modelName: 'User',
  });

  console.log(User === sequelize.models.User);

module.exports = User;


