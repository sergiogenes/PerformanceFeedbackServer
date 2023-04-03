'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    await queryInterface.bulkInsert(
      'positions',
      [
        { id: 1, name: 'Gerente General', createdAt: date, updatedAt: date },
        { id: 2, name: 'Gerente Regional', createdAt: date, updatedAt: date },
        { id: 3, name: 'Country Manager', createdAt: date, updatedAt: date },
        { id: 4, name: 'Gerente', createdAt: date, updatedAt: date },
        { id: 5, name: 'Jefatura Regional', createdAt: date, updatedAt: date },
        { id: 6, name: 'Jefatura', createdAt: date, updatedAt: date },
        {
          id: 7,
          name: 'Coordinador Regional',
          createdAt: date,
          updatedAt: date,
        },
        { id: 8, name: 'Coordinador', createdAt: date, updatedAt: date },
        { id: 9, name: 'Operador', createdAt: date, updatedAt: date },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('positions', null, {})
  },
}
