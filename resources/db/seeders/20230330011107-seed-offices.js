'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    await queryInterface.bulkInsert(
      'offices',
      [
        {
          name: 'Amenabar',
          countryId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'Elia',
          countryId: 1,
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'São Paulo',
          countryId: 2,
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'Santiago de Chile',
          countryId: 3,
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'Bogotá',
          countryId: 4,
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'Quito',
          countryId: 5,
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'Maimi',
          countryId: 6,
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'Ciudad de México',
          countryId: 7,
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'Asunción',
          countryId: 8,
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'Lima',
          countryId: 9,
          createdAt: date,
          updatedAt: date,
        },
        {
          name: 'Montevideo',
          countryId: 10,
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('offices', null, {})
  },
}
