"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Rooms", "isHostWantReplay", {
      type: Sequelize.BOOLEAN,
      defaultValue: undefined,
    });

    await queryInterface.addColumn("Rooms", "isGuestWantReplay", {
      type: Sequelize.BOOLEAN,
      defaultValue: undefined,
    });

    await queryInterface.addColumn("Rooms", "isHostWinRound", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.addColumn("Rooms", "isGuestWinRound", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });

    await queryInterface.addColumn("Rooms", "isTurnFinished", {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
