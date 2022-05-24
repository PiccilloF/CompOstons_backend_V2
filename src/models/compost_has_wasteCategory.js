import { DataTypes, Model } from 'sequelize';
import sequelize from '../../database/index.js';

  class Compost_has_waste extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
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
  });
  
  export default Compost_has_waste;
