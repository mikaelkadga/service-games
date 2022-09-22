'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      roomName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      roomCode: {
        type: Sequelize.STRING,
        unique: true,
      },
      hostUserId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      guestUserId: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      hostScore: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      guestScore: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isFinished: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rooms');
  }
};