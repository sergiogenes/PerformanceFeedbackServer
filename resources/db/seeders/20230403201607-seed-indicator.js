'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    await queryInterface.bulkInsert(
      'indicators',
      [
        {
          id: 1,
          description: 'Indicador 1',
          goal: 45,
          categoryId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          id: 2,
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
