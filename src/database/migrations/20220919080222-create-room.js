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
        type: Sequelize.STRING
      },
      roomCode: {
        type: Sequelize.STRING
      },
      hostUserId: {
        type: Sequelize.INTEGER
      },
      guestUserId: {
        type: Sequelize.INTEGER
      },
      hostScore: {
        type: Sequelize.INTEGER
      },
      guestScore: {
        type: Sequelize.INTEGER
      },
      isFinished: {
        type: Sequelize.BOOLEAN
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