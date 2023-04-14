'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    await queryInterface.bulkInsert(
      'positions',
      [
        { name: 'Gerente General', createdAt: date, updatedAt: date },
        { name: 'Gerente Regional', createdAt: date, updatedAt: date },
        { name: 'Country Manager', createdAt: date, updatedAt: date },
        { name: 'Gerente', createdAt: date, updatedAt: date },
        { name: 'Jefatura Regional', createdAt: date, updatedAt: date },
        { name: 'Jefatura', createdAt: date, updatedAt: date },
        {
          name: 'Coordinador Regional',
          createdAt: date,
          updatedAt: date,
        },
        { name: 'Coordinador', createdAt: date, updatedAt: date },
        { name: 'Operador', createdAt: date, updatedAt: date },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('positions', null, {})
  },
}
