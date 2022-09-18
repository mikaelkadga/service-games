'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt' )

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    //static a = password == "";
    //static #encrypt = (password) => bcrypt.hashSync (password, 10)
    
    static register = ({ fullname, username, email, password }) => {
      console.log(fullname)
      //const encryptedPassword = this.#encrypt(password)
      
      return this.create({ fullname, username, email, password //: encryptedPassword
      })
    }
  }
  User.init({
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};