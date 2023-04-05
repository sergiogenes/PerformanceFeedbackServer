'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    await queryInterface.bulkInsert(
      'reviews',
      [
        {
          indicator: 'Indicador 1',
          goal: 45,
          data: 40,
          result: -5,
          review: 'Faltaron 5, hay que mejorar eficiencia.',
          date,
          evaluatedId: 2,
          evaluatorId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          indicator: 'Indicador 2',
          goal: 60,
          data: 70,
          result: 10,
          review: 'Vamos por buen camino.',
          evaluatedId: 3,
          evaluatorId: 2,
          date,
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reviews', null, {})
  },
}
