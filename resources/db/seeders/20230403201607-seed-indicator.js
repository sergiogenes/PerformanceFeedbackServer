'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    await queryInterface.bulkInsert(
      'indicators',
      [
        {
          description: 'Indicador 1',
          goal: 45,
          categoryId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          description: 'Indicador 2',
          goal: 60,
          categoryId: 1,
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('indicators', null, {})
  },
}
