'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    await queryInterface.bulkInsert(
      'indicators',
      [
        {
          description: 'Recortes',
          goal: 450,
          categoryId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          description: 'Busquedas',
          goal: 1000,
          categoryId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          description: 'Publicaciones',
          goal: 50,
          categoryId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          description: 'Recortes',
          goal: 500,
          categoryId: 2,
          createdAt: date,
          updatedAt: date,
        },
        {
          description: 'Busquedas',
          goal: 1100,
          categoryId: 2,
          createdAt: date,
          updatedAt: date,
        },
        {
          description: 'Publicaciones',
          goal: 60,
          categoryId: 2,
          createdAt: date,
          updatedAt: date,
        },
        {
          description: 'Recortes',
          goal: 550,
          categoryId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          description: 'Busquedas',
          goal: 1200,
          categoryId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          description: 'Publicaciones',
          goal: 70,
          categoryId: 3,
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
