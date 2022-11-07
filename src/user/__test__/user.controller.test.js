const { faker } = require("@faker-js/faker");
const httpMock = require("node-mocks-http");
const { createUser, getUserProfile, updateUser, resetPassword } = require("../user.controller");
const userService = require("../user.service");

let req = httpMock.createRequest();
let res = httpMock.createResponse();
beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();    
    req.auth = { id: faker.datatype.number()};
});

const fakeData = {
    fullname: faker.name.fullName(),
    email: faker.internet.email(),   
    password: faker.internet.password()
}


describe("user.controller.test", () => {
    describe("createUser", () => {
        it("should return created user", async () => {
            userService.createUser = jest.fn();
            const newUser = fakeData
            req.body = newUser;
            userService.createUser.mockReturnValue({newUser});

            const result = await createUser(req, res);
            expect(userService.createUser).toBeCalled();

            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toEqual(                
                expect.objectContaining({
                    newUser: {
                        fullname: newUser.fullname,
                        email: newUser.email,
                        password: newUser.password
                    }                    
                })
            );            
        });

        it("should return error", async () => {
            const errorMessage = { message: "Internal server error!" }
            userService.createUser.mockImplementation(() => {
                throw new Error();
              });

            const result = await createUser(req, res);
            expect(userService.createUser).toBeCalled();

            expect(result.statusCode).toBe(500);
            expect(result._getJSONData()).toEqual(errorMessage);
        });
    });

    describe("getUserProfile", () => {
        it("should return user profile", async () => {
            userService.getUserProfile = jest.fn();
            const currentUser = {
                fullname: faker.name.fullName(),
                email: faker.internet.email(),   
                password: faker.internet.password()
            }
            req.body = currentUser;
            userService.getUserProfile.mockReturnValue({currentUser});

            const result = await getUserProfile(req, res);
            expect(userService.getUserProfile).toBeCalled();

            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toEqual(                
                expect.objectContaining({
                    currentUser: {
                        fullname: currentUser.fullname,
                        email: currentUser.email,
                        password: currentUser.password
                    }                    
                })
            );            
        });

        it("should return error", async () => {        
            const errorMessage = { message: "Internal server error!" };
            userService.getUserProfile.mockImplementation(() => {
                throw new Error();
              });

            const result = await getUserProfile(req, res);
            expect(userService.getUserProfile).toBeCalled();

            expect(result.statusCode).toBe(500);
            expect(result._getJSONData()).toEqual(errorMessage);
        });
    });

    describe("updateUser", () => {
        it("should update user", async () => {
            userService.updateUser = jest.fn();
            const user = {
                fullname: faker.name.fullName(),
                email: faker.internet.email(),   
                password: faker.internet.password()
            }
            req.body = user;
            userService.updateUser.mockReturnValue({user});

            const result = await updateUser(req, res);
            expect(userService.updateUser).toBeCalled();

            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toEqual(                
                expect.objectContaining({
                    user: {
                        fullname: user.fullname,
                        email: user.email,
                        password: user.password
                    }                    
                })
            );            
        });

        it("should return error", async () => {
            const errorMessage = { message: "Internal server error!" }
            userService.updateUser.mockImplementation(() => {
                throw new Error();
              });

            const result = await updateUser(req, res);
            expect(userService.updateUser).toBeCalled();

            expect(result.statusCode).toBe(500);
            expect(result._getJSONData()).toEqual(errorMessage);
        });
    });

    describe("resetPassword", () => {
        it("should reset password", async () => {
            userService.resetPassword = jest.fn();
            const password = faker.internet.password();
            const confirmpassword = password;
            req.auth = { payload : { id : faker.datatype.id}};

            const user = {
                password: password,
                confirmpassword: confirmpassword,
            }
            req.body = {password, confirmpassword};
            userService.resetPassword.mockReturnValue({user});

            const result = await resetPassword(req, res);
            expect(userService.resetPassword).toBeCalled();

            expect(result.statusCode).toBe(200);
            expect(result._getJSONData()).toEqual(                
                expect.objectContaining({
                    user: {
                        password: user.password,
                        confirmpassword: user.confirmpassword,
                    }                    
                })
            );            
        });

        it("should return error", async () => {
            const errorMessage = { message: "Internal server error!" };
            req.auth = { payload : { id : faker.datatype.id}};
            const password = faker.internet.password();
            const confirmpassword = password;
            req.body = {password, confirmpassword};
            userService.resetPassword.mockImplementation(() => {
                throw new Error();
              });

            const result = await resetPassword(req, res);
            expect(userService.resetPassword).toBeCalled();

            expect(result.statusCode).toBe(500);
            expect(result._getJSONData()).toEqual(errorMessage);
        });

        it("should return error password does not match", async () => {
            const errorMessage = { message: "Password is not matched" };
            const password = faker.internet.password();
            const confirmpassword = faker.internet.password();
            req.body = {password, confirmpassword};
            req.auth = { payload : { id : faker.datatype.id}};

            const result = await resetPassword(req, res);

            expect(result.statusCode).toBe(400);
            expect(result._getJSONData()).toEqual(errorMessage);
        });
    });
});