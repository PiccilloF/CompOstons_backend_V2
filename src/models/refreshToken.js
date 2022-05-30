const {DataTypes, Model } = require('sequelize');
const sequelize = require ('../database/index');

class RefreshToken extends Model {

  toJSON() {
    return{ ...this.get(), id: undefined, UserId: undefined};
  }
}
  RefreshToken.init({
    token: {
      type: DataTypes.STRING
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
          references: {
          model: 'user',
          key:'id',
          as: 'UserId'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
  }, { 
    sequelize, 
    tableName: 'refreshToken',
    modelName: 'RefreshToken'
  });

  module.exports = RefreshToken;