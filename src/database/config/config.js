require("dotenv").config();

const config = {
  development: {
    username: "alief",
    password: "123456",
    database: "chapter9",
    host:  "127.0.0.1",
    port: "5432",
    dialect: "postgres",
  },
};

module.exports = config;
