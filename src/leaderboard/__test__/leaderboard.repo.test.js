const { faker } = require("@faker-js/faker");
const { getAllUser } = require("../leaderboard.repository");
const { User } = require("../../database/models");

const fakeData = {
    fullname: faker.name.fullName(),
    totalPoint: faker.datatype.number(),
    userId: faker.datatype.number(),
}

describe('leaderboard.repo.test', () => {
    describe('getAllUser', () => {
        it('should return all user`s total point', async () => {
            User.findAll = jest.fn();
            User.findAll.mockReturnValue(fakeData);
            const result = await getAllUser()
            expect(result).toEqual(
                expect.objectContaining(fakeData)
            );
        });
    });
});