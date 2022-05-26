'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
   await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
          }
        }
      },
      email: {
        type :DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail:{
            msg: 'Not a valid email address'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      },
      profile:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'chercheur',
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('user');
  }
};
