import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/index.js';

  class Compost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Waste_category, {through: 'compost_has_wasteCategory', as: 'wastes'}),
      this.belongsTo(models.User, {foreignKey: {name: 'UserId'}, onDelete: 'CASCADE', as:'user'})
    }

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
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'compost',
    modelName: 'Compost',
  });
  
    export default Compost;
