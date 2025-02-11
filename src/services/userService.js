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

const ChangePasswordByUserId = async (id) => {
  return await userModel.ChangePasswordByUserId(id);
};

const updateUserById = async (user) => {
  return await userModel.updateUserById(user);
};

const updateArressById = async (user) => {
  return await userModel.updateAddressById(user);
};

const insertUserAddress = async (user) => {
  return await userModel.insertUserAddress(user);
};

const getPasswordFromPsswordTbl = async (user) => {
  return await userModel.getPasswordFromPsswordTbl(user);
};


module.exports = {
  getUserById,
  getUserByEmail,
  forgetPasswordByEmail,
  ChangePasswordByUserId,
  updateUserById,
  updateArressById,
  insertUserAddress,
  getPasswordFromPsswordTbl
};
