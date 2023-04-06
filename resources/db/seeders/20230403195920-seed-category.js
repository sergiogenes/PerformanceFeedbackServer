'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          name: 'Categoría 1',
          competence:
            'Esta es el campo donde van las competencias de esta categoría.',
          function: 'La función de esta categoría es funcionar.',
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'Categoría 2',
          competence:
            'Esta es el campo donde van las competencias de esta categoría.',
          function: 'La función de esta categoría es funcionar.',
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'Categoría 3',
          competence:
            'Esta es el campo donde van las competencias de esta categoría.',
          function: 'La función de esta categoría es funcionar.',
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {})
  },
}
