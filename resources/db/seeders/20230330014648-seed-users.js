'use strict'

const bcrypt = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const date = new Date()
    const salt = bcrypt.genSaltSync(9)
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          isAdmin: true,
          firstName: 'admin',
          lastName: 'admin',
          password: bcrypt.hashSync('12345678', salt),
          salt,
          email: 'admin@example.com',
          fileNumber: 'AR1',
          updatedAt: date,
          createdAt: date,
          positionId: 1,
          officeId: 1,
          teamId: 1,
        },
        {
          isAdmin: true,
          firstName: 'Marco',
          lastName: 'Polo',
          password: bcrypt.hashSync('12345678', salt),
          salt,
          email: 'marco@example.com',
          fileNumber: 'AR2',
          shift: 'morning',
          updatedAt: date,
          createdAt: date,
          positionId: 2,
          officeId: 1,
          teamId: 1,
        },
        {
          isAdmin: false,
          firstName: 'Anacleto',
          lastName: 'Perez',
          password: bcrypt.hashSync('12345678', salt),
          salt,
          email: 'anacleto@example.com',
          fileNumber: 'AR3',
          shift: 'morning',
          updatedAt: date,
          createdAt: date,
          positionId: 3,
          officeId: 1,
          teamId: 1,
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
