'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    await queryInterface.bulkInsert(
      'countries',
      [
        { name: 'Argentina', ISO: 'AR', createdAt: date, updatedAt: date },
        { name: 'Brazil', ISO: 'BR', createdAt: date, updatedAt: date },
        { name: 'Chile', ISO: 'CL', createdAt: date, updatedAt: date },
        { name: 'Colombia', ISO: 'CO', createdAt: date, updatedAt: date },
        { name: 'Ecuador', ISO: 'EC', createdAt: date, updatedAt: date },
        { name: 'United States', ISO: 'US', createdAt: date, updatedAt: date },
        { name: 'Mexico', ISO: 'MX', createdAt: date, updatedAt: date },
        { name: 'Paraguay', ISO: 'PY', createdAt: date, updatedAt: date },
        { name: 'Peru', ISO: 'PE', createdAt: date, updatedAt: date },
        { name: 'Uruguay', ISO: 'UY', createdAt: date, updatedAt: date },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('countries', null, {})
  },
}
