'use strict';

module.exports = {  
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('compost_has_wasteCategory', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      CompostId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      WasteCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
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
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('compost_has_wasteCategory');
  }
}

