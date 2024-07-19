const userModel = require('../models/userModel');

const getUserById = async (id) => {
  return await userModel.getUserById(id);
};

const getUserByEmail = async (id) => {
  return await userModel.getUserbyMail(id);
};

const forgetPasswordByEmail = async (id) => {
  return await userModel.forgetPasswordByEmail(id);
};
module.exports = {
  getUserById,
  getUserByEmail
};
