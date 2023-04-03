'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      indicator: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      goal: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      data: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      result: {
        type: Sequelize.INTEGER,
      },
      review: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      evaluatedId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      evaluatorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews')
  },
}
