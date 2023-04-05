'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('indicators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        // allowNull: false,
        type: Sequelize.TEXT,
      },
      goal: {
        // allowNull: false,
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        // allowNull: false,
        references: {
          model: 'categories',
          key: 'id',
        },
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('indicators')
  },
}
