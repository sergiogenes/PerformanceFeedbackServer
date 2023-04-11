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
          email: 'admin@example.com',
          fileNumber: 'AR1',
          image: 'https://api.multiavatar.com/AR1.svg',
          updatedAt: date,
          createdAt: date,
          positionId: 1,
          officeId: 1,
          categoryId: 1,
          teamId: 1,
        },
        {
          isAdmin: false,
          firstName: 'Alonso',
          lastName: 'Quijano',
          password: bcrypt.hashSync('12345678', salt),
          salt,
          email: 'donquijote@example.com',
          fileNumber: 'AR2',
          image: 'https://api.multiavatar.com/AR2.svg',
          shift: 'morning',
          updatedAt: date,
          createdAt: date,
          positionId: 2,
          officeId: 1,
          categoryId: 2,
          teamId: 1,
        },
        {
          isAdmin: false,
          firstName: 'Sancho',
          lastName: 'Panza',
          password: bcrypt.hashSync('12345678', salt),
          salt,
          email: 'spanza@example.com',
          fileNumber: 'AR3',
          image: 'https://api.multiavatar.com/AR3.svg',
          shift: 'morning',
          updatedAt: date,
          createdAt: date,
          positionId: 3,
          officeId: 1,
          teamId: 1,
          categoryId: 3,
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
