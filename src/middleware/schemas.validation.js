const userRepo = require("../user/user.repository");

const registrationSchema = {
  email: {
    isString: true,
    custom: {
      options: async (value) => {
        const user = await userRepo.getUser({
          email: value,
        });
        if (user) {
          return Promise.reject("Email telah terdaftar!");
        }
      },
    },
  },
  password: {
    isString: true,
    isStrongPassword: {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    errorMessage:
      "Password setidaknya mengandung minimal 8 character dan minimal 1 huruf kapital dan 1 angka dan 1 symbol.",
  },
};

const updateUser = {
  fullname: {
    isString: true,
    notEmpty: true,
    errorMessage: "Fullname must not be empty",
  },
  email: {
    isString: true,
    notEmpty: true,
    errorMessage: "Email must not be empty",
  },
  password: {
    isString: true,
    notEmpty: true,
    errorMessage: "Password must not be empty",
  },
};

const schemas = {
  registrationSchema,
  updateUser
};

module.exports = schemas;
