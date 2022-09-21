const authRepository = require("./auth.repository")

const findUser = async (email) => {
    return await authRepository.findUser(email)
}

const authService = {
    findUser
}

module.exports = authService