const {DataTypes, Model} = require('sequelize');
const sequelize = require('../database/index');

class Article extends Model {

  toJSON() {
    return{ ...this.get(), id: undefined, UserId: undefined}
  }
}
  Article.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    picture_alt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'article',
    modelName: 'Article',
  });

  module.exports = Article;
