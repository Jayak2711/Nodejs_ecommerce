const oderModel = require('../models/orderModel');

const getAllOrderAdmin = async (id) => {
  return await oderModel.getAllOrderAdmin(id);
};

const getAllOrderWithUserId = async (id) => {
console.log('id----------------------------------------------------------------',id)
    return await oderModel.getAllOrderWithUserId(id);
  };

  const getorderWithDate = async (id) => {
    return await oderModel.getorderWithDate(id);
  };

  const insertOrderRec = async (id) => {
    return await oderModel.insertOrderRec(id);
  };

  const insertAllCartRec = async (id) => {
    return await oderModel.insertAllCartRec(id);
  };

  const insertIntoPaymentWithUSerId = async (id) => {
    return await oderModel.insertIntoPaymentWithUSerId(id);
  };
  const getOrderIdForPayment = async (id) => {
    return await oderModel.insertIntoPaymentWithUSerId(id);
  };
  const paymentWithUserId = async (id) => {
    return await oderModel.paymentWithUserId(id);
  };

  const updateOrderTable = async (id) => {
    return await oderModel.updateOrderTable(id);
  };

  const categoryReport = async (id) => {
    console.log('category',id)
    return await oderModel.categoryReport(id);
  };
module.exports = {
    getAllOrderAdmin,
    getAllOrderWithUserId,
    getorderWithDate,
    insertOrderRec,
    insertAllCartRec,
    insertIntoPaymentWithUSerId,
    getOrderIdForPayment,
    paymentWithUserId,
    updateOrderTable,
    categoryReport
}