const createRoom = {
  roomName: {
    isString: true,
    notEmpty: true,
    errorMessage: "roomName must be a string and not empty",
  },
};

const roomSchemas = {
  createRoom,
};

module.exports = roomSchemas;
