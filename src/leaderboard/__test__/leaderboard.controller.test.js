const { faker } = require("@faker-js/faker");
const httpMock = require("node-mocks-http");
const { getAllUser } = require("../leaderboard.controller");
const leaderboardService = require("../leaderboard.service");

let req = httpMock.createRequest();
let res = httpMock.createResponse();

beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
});

const fakeData = {
    fullname: faker.name.fullName(),
    totalPoint: faker.datatype.number(),
    userId: faker.datatype.number(),
}

describe('leaderboard.controller.test', () => {
    describe('getAllUser', () => {
        it('should return user`s total point', async () => {
            leaderboardService.getAllUser = jest.fn();
            leaderboardService.getAllUser.mockReturnValue(fakeData);

            const result = await getAllUser(req, res);

            expect(leaderboardService.getAllUser).toBeCalled();
            expect(result._getJSONData()).toEqual(expect.objectContaining(fakeData));
        });

        it("should return an error", async () => {
            let errorMessage = "Internal server error";
            leaderboardService.getAllUser.mockImplementation(() => {
                throw new Error();
              });

            try {
                await getAllUser(req, res);
            } catch (error) {
                expect(roomService.getAllUser).toBeCalled();
                expect(error.code).toBe(500); 
                expect(error.message).toBe(errorMessage); 
            }
        });
    });
});