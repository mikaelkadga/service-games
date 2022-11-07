const { faker } = require("@faker-js/faker");
const { createRoom, findRoom, getAllRoom, getRoomId, updateRoom, updateGuestUser } = require("../room.service");
const roomRepository = require("../room.repo");

roomRepository.updateRoom = jest.fn();
roomRepository.updateGuestUser = jest.fn();

const fakeData = {
    roomName: faker.random.words(2),
    hostUserId: faker.datatype.number()
};

describe('room.service.test', () => {
    describe("createRoom", () => {
        it("should create a room", async () => {
            roomRepository.createRoom = jest.fn();
            roomRepository.createRoom.mockReturnValue(fakeData);
            const result = await createRoom(fakeData.roomName, fakeData.hostUserId);
            expect(roomRepository.createRoom).toBeCalled();
            expect(result).toEqual(expect.objectContaining(fakeData));            
        });

        it("should return error", async () => {
            roomRepository.createRoom.mockImplementation(() => {
                throw new Error();
              });
            try {
                await createRoom(fakeData.roomName, fakeData.hostUserId);
            } catch (error) {
                expect(roomRepository.createRoom).toBeCalled();
                expect(error.code).toBe(401); 
                expect(error.message).toBe("Failed while create a new room"); 
            }
        });
    });

    describe('getAllRoom', () => {
        it('should return all room', async () => {
            roomRepository.getAllRoom = jest.fn();
            roomRepository.getAllRoom.mockReturnValue(fakeData);
            const result = await getAllRoom();
            expect(roomRepository.getAllRoom).toBeCalled();
            expect(result).toEqual(expect.objectContaining(fakeData)); 
        });

        it("should return an error", async () => {
            roomRepository.getAllRoom.mockImplementation(() => {
                throw new Error();
              });

            try {
                await getAllRoom();
            } catch (error) {
                expect(roomRepository.getAllRoom).toBeCalled();
                expect(error.code).toBe(500); 
                expect(error.message).toBe("Unknown Error"); 
            }
        });
    });

    describe('findRoom', () => {
        it('should return a specific room', async () => {
            roomRepository.findRoom = jest.fn();
            roomRepository.findRoom.mockReturnValue(fakeData);
            const result = await findRoom(fakeData.hostUserId);
            expect(roomRepository.findRoom).toBeCalled();
            expect(result).toEqual(expect.objectContaining(fakeData));
        });

        it("should return an error", async () => {
            roomRepository.findRoom.mockImplementation(() => {
                throw new Error();
              });

            try {
                await findRoom(faker.datatype.number);
            } catch (error) {
                expect(roomRepository.findRoom).toBeCalled();
                expect(error.code).toBe(404); 
                expect(error.message).toBe("Room not exist"); 
            }
        });
    });

    describe("getRoomId", () => {
        it("should return a room id", async () => {      
            roomRepository.findRoomWithCode = jest.fn();      
            roomRepository.findRoomWithCode.mockReturnValue({id: 1});

            const result = await getRoomId(fakeData.roomName);

            expect(roomRepository.findRoomWithCode).toBeCalled();
            expect(result).toEqual(expect.objectContaining({id: 1}));            
        });

        it("should return an error", async () => {
            roomRepository.findRoomWithCode.mockImplementation(() => {
                throw new Error();
              });

            try {
                await getRoomId(faker.datatype.number);
            } catch (error) {
                expect(roomRepository.findRoomWithCode).toBeCalled();
                expect(error.code).toBe(404); 
                expect(error.message).toBe("Room not exist"); 
            }
        });
    });

    describe("updateRoom", () => {
        it("should update a room", async () => {
            const newRoom = {
                roomName: faker.random.words(2),
                hostUserId: faker.datatype.number(),
                id : faker.datatype.number(),
                guestUserId: faker.datatype.number(),
                hostScore: faker.datatype.number(),
                guestScore: faker.datatype.number(),
                hostSelection: faker.datatype.number(),
                guestSelection: faker.datatype.number(),
                turn : faker.datatype.number(),
                isFinished : faker.datatype.boolean()
            };
            
            roomRepository.updateRoom.mockReturnValue({newRoom});

            const result = await updateRoom(newRoom.id, newRoom.guestUserId, newRoom.hostScore, 
                                    newRoom.guestScore, newRoom.hostSelection, newRoom.guestSelection, 
                                    newRoom.turn, newRoom.isFinished);
            expect(roomRepository.updateRoom).toBeCalled();

            expect(result).toEqual(expect.objectContaining({newRoom}));            
        });

        it("should return an error", async () => {
            const newRoom = {
                hostUserId: faker.datatype.number(),
                id : faker.datatype.number()
            };
            roomRepository.updateRoom.mockReturnValue(null);

            try {
                await updateRoom(newRoom.id, newRoom.guestUserId);
            } catch (error) {
                expect(roomRepository.updateRoom).toBeCalled();
                expect(error.code).toBe(404); 
                expect(error.message).toBe("Room not exist"); 
            }
        });

        it("should return an error", async () => {
            roomRepository.updateRoom.mockImplementation(() => {
                throw new Error();
              });

            try {
                await updateRoom(1,1,1,1,1,1,1,1);
            } catch (error) {
                expect(roomRepository.updateRoom).toBeCalled();
                expect(error.code).toBe(401); 
                expect(error.message).toBe("Failed while update the room"); 
            }
        });
    });
});