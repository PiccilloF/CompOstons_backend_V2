'use strict';

module.exports = {
  async up(queryInterface, DataTypes) {
  await queryInterface.createTable('waste_category', {
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
    label: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
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
    await queryInterface.dropTable('waste_category');
  }
};