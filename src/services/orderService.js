const oderModel = require('../models/orderModel');

const getAllOrderAdmin = async (id) => {
  return await oderModel.getAllOrderAdmin(id);
};

const getAllOrderWithUserId = async (id) => {
    console.log('saddddddddddddddddddddddddd',id)
    return await oderModel.getAllOrderWithUserId(id);
  };

  const getorderWithDate = async (id) => {
    return await oderModel.getorderWithDate(id);
  };

  const insertOrderRec = async (id) => {
    return await oderModel.insertOrderRec(id);
  };
module.exports = {
    getAllOrderAdmin,
    getAllOrderWithUserId,
    getorderWithDate,
    insertOrderRec
}