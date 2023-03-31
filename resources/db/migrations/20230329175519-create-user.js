'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      fileNumber: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      password: {
        validate: {
          isStrongPassword: {
            minLength: 8,
            minLowercase: 0,
            minUppercase: 0,
            minNumbers: 0,
            minSymbols: 0,
          },
        },
        type: Sequelize.STRING,
      },
      salt: {
        type: Sequelize.STRING,
      },
      isAdmin: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      deactivated_at: {
        type: Sequelize.DATE,
      },
      shift: {
        type: Sequelize.ENUM('morning', 'afternoon', 'night'),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      officeId: {
        // allowNull: false,
        type: Sequelize.SMALLINT,
      },
      teamId: {
        type: Sequelize.SMALLINT,
      },
      positionId: {
        // allowNull: false,
        type: Sequelize.SMALLINT,
      },
      leaderId: {
        type: Sequelize.SMALLINT,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users')
  },
}
