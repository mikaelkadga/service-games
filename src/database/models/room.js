'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Room.init({
    roomName: DataTypes.STRING,
    roomCode: DataTypes.STRING,
    hostUserId: DataTypes.INTEGER,
    guestUserId: DataTypes.INTEGER,
    hostScore: DataTypes.INTEGER,
    guestScore: DataTypes.INTEGER,
    hostSelection: DataTypes.INTEGER,
    guestSelection: DataTypes.INTEGER,
    isFinished: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Room',
  });
  return Room;
};