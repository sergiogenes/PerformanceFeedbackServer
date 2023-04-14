'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    await queryInterface.bulkInsert(
      'teams',
      [
        { name: 'Comercial', createdAt: date, updatedAt: date },
        { name: 'Sistemas', createdAt: date, updatedAt: date },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('teams', null, {})
  },
}
