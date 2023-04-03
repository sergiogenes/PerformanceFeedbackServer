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
          id: 1,
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
          id: 2,
          isAdmin: true,
          firstName: 'Alonso',
          lastName: 'Quijano',
          password: bcrypt.hashSync('12345678', salt),
          salt,
          email: 'donquijote@example.com',
          fileNumber: 'AR2',
          shift: 'morning',
          updatedAt: date,
          createdAt: date,
          positionId: 2,
          officeId: 1,
          teamId: 1,
        },
        {
          id: 3,
          isAdmin: false,
          firstName: 'Sancho',
          lastName: 'Panza',
          password: bcrypt.hashSync('12345678', salt),
          salt,
          email: 'spanza@example.com',
          fileNumber: 'AR3',
          shift: 'morning',
          updatedAt: date,
          createdAt: date,
          positionId: 3,
          officeId: 1,
          teamId: 1,
          leaderId: 2,
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
