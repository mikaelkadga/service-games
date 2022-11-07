const { faker } = require("@faker-js/faker");
const httpMock = require("node-mocks-http");
const { createRoom, findRoom, getAllRoom, getRoomId, updateRoom } = require("../room.controller");
const roomService = require("../room.service");

let req = httpMock.createRequest();
let res = httpMock.createResponse();
let userId = faker.datatype.number();

beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
    req.auth = { id: userId};
});

describe("roomController", () => {
    describe("createRoom", () => {
        it("should return created room", async () => {
            roomService.createRoom = jest.fn();
            const newRoom = {
                                roomName: faker.random.words(2),
                                roomCode: faker.random.words(2)
                            };
            req.body = newRoom;            
            roomService.createRoom.mockReturnValue(newRoom);

            const result = await createRoom(req, res);
            expect(roomService.createRoom).toBeCalled();

            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toEqual(newRoom.roomCode);            
        });

        it("should return error", async () => {
            const errorMessage = "Internal Error";
            roomService.createRoom.mockImplementation(() => {
                throw new Error(errorMessage);
              });

            const newRoom = {roomName: faker.random.words(2)};
            req.body = newRoom;

            try {
                await createRoom(req, res);
            } catch (error) {
                expect(roomService.createRoom).toBeCalled();
                expect(error.code).toBe(500);
                expect(error.message).toEqual(errorMessage); 
            }            
        });
    });

    describe("findRoom", () => {
        it("should return a room", async () => {
            roomService.findRoom = jest.fn();
            const newRoom = {                
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2) + faker.datatype.number(),
                hostUserId: faker.datatype.number()
            };
            req.body = newRoom;            
            roomService.findRoom.mockReturnValue({newRoom});

            const result = await findRoom(req, res);

            expect(roomService.findRoom).toBeCalled();
            expect(result._getJSONData()).toEqual(expect.objectContaining({newRoom}));            
        });

        it("should return an error", async () => {
            const newRoom = {                
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2) + faker.datatype.number(),
                hostUserId: faker.datatype.number()
            };
            req.body = newRoom;
            roomService.findRoom.mockImplementation(() => {
                throw new Error();
              });

            try {
                await findRoom(req, res);
            } catch (error) {
                expect(roomService.findRoom).toBeCalled();
                expect(error.code).toBe(404); 
                expect(error.message).toBe("Room not exist"); 
            }
        });
    });
    
    describe("getAllRoom", () => {
        it("should return all room", async () => {
            roomService.getAllRoom = jest.fn();
            const newRoom = {                
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2) + faker.datatype.number(),
                hostUserId: faker.datatype.number()
            };
            const newRoom2 = {                
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2) + faker.datatype.number(),
                hostUserId: faker.datatype.number()
            };       
            roomService.getAllRoom.mockReturnValue({newRoom, newRoom2});

            const result = await getAllRoom(req, res);

            expect(roomService.getAllRoom).toBeCalled();
            expect(result._getJSONData()).toEqual(expect.objectContaining({newRoom, newRoom2}));            
        });

        it("should return an error", async () => {
            let errorMessage = "Internal server error";
            roomService.getAllRoom.mockImplementation(() => {
                throw new Error();
              });

            try {
                await getAllRoom(req, res);
            } catch (error) {
                expect(roomService.getAllRoom).toBeCalled();
                expect(error.code).toBe(500); 
                expect(error.message).toBe(errorMessage); 
            }
        });
    });

    describe("getRoom", () => {
        it("should return a room", async () => {
            roomService.getRoomId = jest.fn();
            const room = {                
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2) + faker.datatype.number(),
                hostUserId: userId
            };
            req.params = room;            
            roomService.getRoomId.mockReturnValue(room);

            const result = await getRoomId(req, res);

            expect(roomService.getRoomId).toBeCalled();
            expect(result._getJSONData()).toEqual(expect.objectContaining({room}));            
        });

        it("should update and return a room", async () => {
            roomService.updateGuestUser = jest.fn();
            const room = {                
                id: faker.datatype.number(),
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2) + faker.datatype.number(),
                hostUserId: faker.datatype.number()
            };
            req.body = room;
            roomService.getRoomId.mockReturnValue(room);
            roomService.updateGuestUser.mockReturnValue({room});

            try {
                await getRoomId(req, res);
            } catch (error) {
                expect(roomService.getRoomId).toBeCalled();
                expect(roomService.updateGuestUser).toBeCalled();
                expect(error.code).toBe(500); 
                expect(error.message).toBe("Room not exist"); 
            }
        });

        it("should return an error", async () => {
            const room = {                
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2) + faker.datatype.number(),
                hostUserId: faker.datatype.number()
            };
            req.body = room;
            roomService.getRoomId.mockImplementation(() => {
                throw new Error();
              });

            try {
                await getRoomId(req, res);
            } catch (error) {
                expect(roomService.getRoomId).toBeCalled();
                expect(error.code).toBe(500); 
                expect(error.message).toBe("Room not exist"); 
            }
        });
    });

    describe("updateRoom", () => {
        it("should return updated room with guest", async () => {
            roomService.updateRoom = jest.fn();
            const newRoom = {
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2),
                roomCode: faker.random.words(2)
            };
            req.body = newRoom;            
            roomService.updateRoom.mockReturnValue(newRoom);
            roomService.findRoom.mockReturnValue(newRoom);

            const result = await updateRoom(req, res);
            expect(roomService.updateRoom).toBeCalled();

            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toEqual(expect.objectContaining(newRoom));            
        });

        it("should return updated room with host", async () => {
            const newRoom = {
                hostUserId: userId,
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2),
                roomCode: faker.random.words(2)
            };
            req.body = newRoom;            
            roomService.updateRoom.mockReturnValue(newRoom);
            roomService.findRoom.mockReturnValue(newRoom);

            const result = await updateRoom(req, res);
            expect(roomService.updateRoom).toBeCalled();

            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toEqual(expect.objectContaining(newRoom));            
        });

        it("should return updated room with draw", async () => {
            const newRoom = {
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2),
                roomCode: faker.random.words(2),
                hostSelection: 1,
                guestSelection: 1,
                selection: 1,
                turn: 1
            };
            req.body = newRoom;            
            roomService.updateRoom.mockReturnValue(newRoom);
            roomService.findRoom.mockReturnValue(newRoom);

            const result = await updateRoom(req, res);
            expect(roomService.updateRoom).toBeCalled();

            expect(result.statusCode).toBe(200);
            const jsonResult = result._getJSONData();
            expect(jsonResult).toEqual(expect.objectContaining(newRoom));
            expect(jsonResult.isFinished).toEqual(true);
        });

        it("should return updated room with host win", async () => {
            const newRoom = {
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2),
                roomCode: faker.random.words(2),
                guestUserId: null,
                hostSelection: 1,
                guestSelection: 3,
                selection: 3,
                hostScore: 0,
                turn: 1
            };
            req.body = newRoom;            
            roomService.updateRoom.mockReturnValue(newRoom);
            roomService.findRoom.mockReturnValue(newRoom);

            const result = await updateRoom(req, res);
            expect(roomService.updateRoom).toBeCalled();

            expect(result.statusCode).toBe(200);
            const jsonResult = result._getJSONData();
            expect(jsonResult.hostScore).toEqual(1);
            expect(jsonResult.isFinished).toEqual(true);
        });

        it("should return updated room with guest win", async () => {
            const newRoom = {
                hostUserId: userId,
                roomId: faker.datatype.number(),
                roomName: faker.random.words(2),
                roomCode: faker.random.words(2),
                hostSelection: 3,
                guestSelection: 1,
                selection: 3,
                guestScore: 0,
                turn: 1
            };
            req.body = newRoom;            
            roomService.updateRoom.mockReturnValue(newRoom);
            roomService.findRoom.mockReturnValue(newRoom);

            const result = await updateRoom(req, res);
            expect(roomService.updateRoom).toBeCalled();

            expect(result.statusCode).toBe(200);
            const jsonResult = result._getJSONData();
            expect(jsonResult.guestScore).toEqual(1);
            expect(jsonResult.isFinished).toEqual(true);
        });

        it("should return error", async () => {
            const errorMessage = "Internal Error";
            roomService.findRoom.mockImplementation(() => {
                throw new Error(errorMessage);
              });

            const newRoom = {roomName: faker.random.words(2)};
            req.body = newRoom;

            try {
                await updateRoom(req, res);
            } catch (error) {
                expect(roomService.findRoom).toBeCalled();
                expect(roomService.updateRoom).not.toBeCalled();
                expect(error.code).toBe(500);
                expect(error.message).toEqual(errorMessage); 
            }            
        });
    });
});