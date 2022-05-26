const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/index');

  class Compost extends Model {

    toJSON() {
      return { ...this.get(), UserId: undefined, id:undefined }
    }
  }
  Compost.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    longitude:{
      type: DataTypes.FLOAT,
      allowNull: false
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    availability: {
      type: DataTypes.BOOLEAN,
      allowNull: false
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
    }
  }, {
    sequelize,
    tableName: 'compost',
    modelName: 'Compost',
  });
  
    module.exports = Compost;
