const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/index');

  class Compost_has_waste extends Model {

    toJSON() {
      return { ...this.get(),id: undefined}
    };
  }
  Compost_has_waste.init({
    CompostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    WasteCategoryId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'compost_has_wasteCategory',
    modelName: 'Compost_has_wasteCategory',
    timestamps: false
  });
  
  module.exports = Compost_has_waste;
