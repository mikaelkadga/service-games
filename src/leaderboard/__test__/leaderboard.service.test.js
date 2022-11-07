const { faker } = require("@faker-js/faker");
const { getAllUser } = require("../leaderboard.service");
const leaderboardRepo = require("../leaderboard.repository");



const fakeData = {
    fullname: faker.name.fullName(),
    totalPoint: faker.datatype.number(),
    userId: faker.datatype.number(),
}

describe('leaderboard.service.test', () => {
    describe('getAllUser', () => {
        it('should return user`s total point', async () => {
            leaderboardRepo.getAllUser = jest.fn();
            leaderboardRepo.getAllUser.mockReturnValue(fakeData);

            const result = await getAllUser();
            expect(leaderboardRepo.getAllUser).toBeCalled();

            expect(result).toEqual(expect.objectContaining(fakeData));
        });
        
    });
});