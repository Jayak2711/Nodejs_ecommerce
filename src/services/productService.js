const prodctModel = require('../models/productModel');

const insertCartByProdId = async (res) => {
  return await prodctModel.insertCartByProdId(res);
};



const addNewProduct = async (res) => {
  return await prodctModel.addNewProduct(res);
};

const inserCategory = async (res) => {
  return await prodctModel.inserCategory(res);
};

const selectCartByUserId = async (res) => {
  return await prodctModel.selectCartByUserId(res);
};

const getAllCartRecord = async () => {
  return await prodctModel.getAllCartRecord();
};

const deleteCartByProdId = async (res) => {
  return await prodctModel.deleteCartByProdId(res);
};

const getAllCategory = async (res) => {
  return await prodctModel.getAllCategory(res);
};

const selectProductByCategory = async (res) => {
  return await prodctModel.selectProductByCategory(res);
};

const selectAllProduct = async (res) => {
  return await prodctModel.selectAllProduct(res);
};

const deleteProductById = async (res) => {
  return await prodctModel.deleteProductById(res);
};

const deleteCategory = async (res) => {
  return await prodctModel.deleteCategory(res);
};

module.exports = {
  insertCartByProdId,
  selectCartByUserId,
  getAllCartRecord,
  getAllCategory,
  deleteCartByProdId,
  selectProductByCategory,
  deleteProductById,
  selectAllProduct,
  addNewProduct,
  inserCategory,
  deleteCategory
};
