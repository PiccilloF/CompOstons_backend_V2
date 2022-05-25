const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/index');

  class Waste_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Waste_category.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'waste_category',
    modelName: 'Waste_category',
  });
  
    module.exports = Waste_category;