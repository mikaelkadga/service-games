const userRepo = require("./user.repository");
const bcrypt = require("bcrypt");
const saltRound =10;

const createUser = async ({ username, fullname, email, password}) => {
    const hashPassword = await bcrypt.hash(password, saltRound);
    
    return await userRepo.createUser({
        username,
        fullname,
        email,
        password: hashPassword,
    });
};

const userService = {
    createUser
}

module.exports = userService;