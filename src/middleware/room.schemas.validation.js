const createRoom = {
  roomName: {
    isString: true,
    notEmpty: true,
    errorMessage: "roomName must be a string and not empty",
  },
};

const updateRoom = {
  roomId: {
    notEmpty: true,
    errorMessage: "roomId must be not empty",
  }
}

const roomSchemas = {
  createRoom,
  updateRoom
};

module.exports = roomSchemas;
