import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/index.js';

  class Waste_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({models}) {
      // define association here
      this.belongsToMany(models.Compost, {through: 'compost_has_wasteCategory', as: 'wastes'});
    }
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
  
    export default Waste_category;