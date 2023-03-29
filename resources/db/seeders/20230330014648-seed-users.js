'use strict'

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    const salt = bcrypt.genSaltSync(9)
    await queryInterface.bulkInsert(
      'users',
      [
        {
          isAdmin: true,
          firstName: 'admin',
          lastName: 'admin',
          password: bcrypt.hashSync('12345678', salt),
          salt,
          email: 'admin',
          fileNumber: 'AR1',
          updatedAt: date,
          createdAt: date,
          positionId: 1,
          officeId: 1,
          teamId: 1,
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
