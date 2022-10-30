const { createUser, getUser } = require("../user.repository");
const { faker } = require("@faker-js/faker");
const { User } = require("../../database/models");

const fakeData = {
    fullname: faker.name.fullName(),
    email: faker.internet.email(),   
    password: faker.internet.password()
}

const testData = {
    fullname: "Olivier Giroud",
    email: "olivier@gmail.com",   
    password: "123123"
}


describe('user.repo.test', () => {
    describe('createUser', () => {
        it('should return new user', async () => {
            //given
            User.findOne = jest.fn(() => false);

            //when
            const result = await createUser(testData);

            //result/expect
            expect(User.findOne).toBeCalledWith({ where: { email: testData.email }, raw: true });
            expect(result.fullname).toBe(testData.fullname);
            expect(result.email).toBe(testData.email);
        });
    });

    describe('getUser', () => {
        it('should return user object', async () => {
            const result = await getUser({userId: 1})
            expect({email: result.email, fullname: result.fullname, password: result.password}).toEqual(testData);
            // expect(result.email).toBe(fakeData.email);
        });
    });

    
});