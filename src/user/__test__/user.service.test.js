const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const { createUser, getUserProfile, updateUser, resetPassword } = require("../user.service");
const userRepository = require("../user.repository");

bcrypt.hash = jest.fn();

const fakeData = {
    fullname: faker.name.fullName(),
    email: faker.internet.email(),   
    password: faker.internet.password()
}

describe("userService", () => {
    describe("createUser", () => {
        it("should return created user", async () => {
            userRepository.createUser = jest.fn();
            userRepository.createUser.mockReturnValue({fakeData});
            bcrypt.hash.mockReturnValue(faker.internet.password());

            const result = await createUser(fakeData.fullname, fakeData.email, fakeData.password);
            expect(userRepository.createUser).toBeCalled();

            expect(result).toEqual(expect.objectContaining({fakeData}));            
        });
    });

    describe("getUserProfile", () => {
        it("should return user profile", async () => {
            userRepository.getUserProfile = jest.fn();
            userRepository.getUserProfile.mockReturnValue({fakeData});

            const result = await getUserProfile(faker.datatype.number());
            expect(userRepository.getUserProfile).toBeCalled();

            expect(result).toEqual(expect.objectContaining({fakeData}));            
        });
    });

    describe("updateUser", () => {
        it("should update user", async () => {
            userRepository.updateUser = jest.fn();
            userRepository.updateUser.mockReturnValue({fakeData});

            const result = await updateUser(faker.datatype.number(), fakeData.fullname, fakeData.email, fakeData.password);
            expect(userRepository.updateUser).toBeCalled();

            expect(result).toEqual(expect.objectContaining({fakeData}));            
        });
    });

    describe("resetPassword", () => {
        it("should reset password", async () => {
            userRepository.updatePassword = jest.fn();
            
            userRepository.updatePassword.mockReturnValue({password: fakeData.password});

            const result = await resetPassword(1, fakeData.password);
            expect(userRepository.updatePassword).toBeCalled();

            expect(result).toEqual(expect.objectContaining({password: fakeData.password}));            
        });
    });
});