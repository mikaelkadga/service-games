const { faker } = require("@faker-js/faker");
const { Room } = require("../../database/models");
const { createRoom, findRoom, findRoomWithCode, getAllRoom, updateGuestUser, updateRoom } = require("../room.repo");
const fakeData = {
    roomName: faker.random.words(2),
    hostUserId: faker.datatype.number()
}

beforeAll(async () => {
    roomTest = await createRoom(fakeData);
});

describe('room.repo.test', () => {
    describe('createRoom', () => {
        it('should create a new room', async () => {
            const result = await createRoom(fakeData);
            expect(result.dataValues).toEqual(
              expect.objectContaining(fakeData)
            );
        });
    });

    describe('updateRoom', () => {
        it('should update a room', async () => {
            let guestUserId = faker.datatype.number();
            let hostScore = 2;
            let guestScore = 3;
            let hostSelection = 1;
            let guestSelection = 1;
            let turn = 1;
            let isFinished = 1;

            const result = await updateRoom(roomTest.id,
                guestUserId,
                hostScore,
                guestScore,
                hostSelection,
                guestSelection,
                turn,
                isFinished);

            expect(result[0]).toEqual(1);
            expect(result[1][0]).toEqual(
                expect.objectContaining({
                    guestUserId : guestUserId,
                    hostScore : hostScore,
                    guestScore: guestScore,
                    hostSelection: hostSelection,
                    guestSelection: guestSelection,
                    turn: turn,
                    isFinished: true
                  })
            );
        });
    });

    describe('updateGuestUser', () => {
        it('should update guest user room', async () => {
            const guestUserId = faker.datatype.number();

            const result = await updateGuestUser({id: roomTest.id, guestUserId});
            expect(result[0]).toBe(1);
            console.log(result)
            expect(result[1][0].id).toBe(roomTest.id);
            expect(result[1][0].guestUserId).toBe(guestUserId);
        });
    });

    describe('getAllRoom', () => {
        it('should return all room', async () => {
            Room.findAll = jest.fn();
            Room.findAll.mockReturnValue(fakeData);
            const result = await getAllRoom();
            expect(result).toEqual(
                expect.objectContaining(fakeData)
            );
        });
    });

    describe('findRoom', () => {
        it('should return a specific room', async () => {
            const result = await findRoom(roomTest.id);
            expect(result).toEqual(
                expect.objectContaining(roomTest)
              );
        });
    });
});