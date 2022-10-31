const { getUserProfile } = require("../user.repository");

const testData = {
    fullname: "Olivier Giroud",
    email: "olivier@gmail.com",   
    password: "123123"
}

describe('user.service.test', () => {
    describe('getUserProfile', () => {
        it('should return ', async () => {
            const result = await getUserProfile({userId: 1})
            expect(result.fullname).toBe(testData.fullname)

        });
    });
});