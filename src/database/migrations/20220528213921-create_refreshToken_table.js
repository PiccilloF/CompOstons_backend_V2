'use strict';

module.exports = {
  async up (queryInterface, DataTypes) {
    await queryInterface.createTable('refreshToken', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER
          },
        token: {
          type: DataTypes.STRING
        },
        UserId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
          model: 'user',
          key:'id',
          as: 'UserId',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        createdAt: {
        allowNull: false,
        type: DataTypes.DATE
        },
        updatedAt: {
          allowNull: false,
          type: DataTypes.DATE
        },
      })
  },

  async down (queryInterface, DataTypes) {
    await queryInterface.dropTable('refreshToken');
  }
};
