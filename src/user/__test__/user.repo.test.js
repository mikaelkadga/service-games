const { createUser, getUser, getUserEmail, getUserProfile, updateUser, updatePassword } = require("../user.repository");
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
            const result = await createUser(testData);
            console.log(result.fullname)
            expect(result.fullname).toBe(testData.fullname);
            expect(result.email).toBe(testData.email);
            expect(result.password).toBe(testData.password);

        });
    });

    describe('getUser', () => {
        it('should return user`s fullname by specific id', async () => {
            const result = await getUser({userId: 1})
            expect(result.fullname).toBe(testData.fullname)
        });
    });

    describe('getUserEmail', () => {
        it('should return user`s fullname by specific email', async () => {
            const result = await getUserEmail({email: "olivier@gmail.com"})
            expect(result.fullname).toBe(testData.fullname)
        });
    });

    describe('getUserProfile', () => {
        it('should return user`s fullname by specific id', async () => {
            const result = await getUserProfile({userId: 1})
            expect(result.fullname).toBe(testData.fullname)
        });
    });

    describe('updateUser', () => {
        it('should update user`s data', async () => {
            const result = await updateUser({userId: 1, fullname: testData.fullname, email: testData.email, password: testData.password})
            expect(result.fullname).toBe(testData.fullname)
        });
    });

    describe('updatePassword', () => {
        it('should update user`s password', async () => {
            const result = await updatePassword({userId: 1, password: testData.password})
            expect(result.fullname).toBe(testData.fullname)
        });
    });
});