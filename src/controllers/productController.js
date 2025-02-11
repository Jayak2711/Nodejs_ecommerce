const productService = require('../services/productService');
const pool = require('../config/db');

const insertCartData = async (req, res) => {
  try {
    const result = await productService.insertCartByProdId(req.body);
    res.status(200).json({ message: 'Data inserted successfully',result : result.rows[0],status : '200'});
  } 
  catch (error) {
    await pool.query('ROLLBACK');
    console.error(error)
    res.status(500).json({ error: 'Error inserting data' });
  }
};



const addNewProduct = async (req, res) => {
  try {
    const result = await productService.addNewProduct(req.body);
    res.status(200).json({ message: 'Data inserted successfully',result : result.rows[0],status : '200'});
  } 
  catch (error) {
    console.error(error)
    await pool.query('ROLLBACK');
    res.status(500).json({ error: 'Error inserting data' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const result = await productService.updateProduct(req.body);
    console.log('--------------------------------------',result)
    res.status(200).json({ message: 'Update successfully',result : result.rows[0],status : '200'});
  } 
  catch (error) {
    res.status(500).json({ error: 'Error inserting data' });
  }
};

const insertCategory = async (req, res) => {
  try {
    const result = await productService.inserCategory(req.body);
    res.status(200).json({ message: 'Data inserted successfully',result : result.rows[0],status : '200'});
  } 
  catch (error) {
    await pool.query('ROLLBACK');
    res.status(500).json({ error: 'Error inserting data' });
  }
};

const deleteCartByCarId = async (req, res) => {
  try {
  const result = await productService.deleteCartByProdId(req.body);
  console.log('',result)
 res.status(200).json({ message: 'Data deleted successfully',status : '200'});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error deleting data' });
  }
};

const selectCartByCarId = async (req, res) => {
  console.log(parseInt(req.params.id))
  try {
    const result = await productService.selectCartByUserId(parseInt(req.params.id));
    console.log(result)
     res.status(200).json({ message: 'Data fetched successfully',result :result.rows,status : '200'}); 
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error Selectings data' });
  }
};

const getAllCart = async (req, res) => {
  try {
    const result = await productService.getAllCartRecord();
     res.status(200).json({ message: 'Data fetched successfully',result : result.rows[0],status : '200'});  
} catch (error) {
    res.status(500).json({ error: 'Error Selectings data' });
  }
};


const getAllCategory = async (req, res) => {
  try {
    const result = await productService.getAllCategory();
    console.log(result)
     res.status(200).json({ message: 'Data fetched successfully',result : result.rows,status : '200'});  
} catch (error) {
    res.status(500).json({ error: 'Error Selectings data' });
  }
};

const selectProductByCategory = async (req, res) => {
  try {
    const result = await productService.selectProductByCategory(req.params.id);
     res.status(200).json({ message: 'Data fetched successfully',result : result.rows,status : '200'});  
} catch (error) {
    res.status(500).json({ error: 'Error Selectings data' });
  }
};

const selectAllProduct = async (req, res) => {
  try {
    const result = await productService.selectAllProduct();
     res.status(200).json({ message: 'Data fetched successfully',result : result.rows,status : '200'});  
} catch (error) {
    res.status(500).json({ error: 'Error Selectings data' });
  }
};

const deleteProductById = async (req, res) => {
  try {
  const result = await productService.deleteProductById(req.params.id);
 res.status(200).json({ message: 'Cart removed successfully',status : '200'});
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error deleting data' });
  }

}
  const deleteCategoryId = async (req, res) => {
    try {
    const result = await productService.deleteCategory(req.params.id);
    console.log('----------------------',result)
   res.status(200).json({ message: 'Category Deleted successfully',status : '200'});
    } catch (error) {
      console.error('sadasdassadsda',error)
      res.status(500).json({ error: 'Error deleting data' });
    }

};

const updateCategory = async (req, res) => {
  try {
    const result = await productService.updateCategory(req.body);
    // console.log(result)
    res.status(200).json({ message: 'Updated Successfully',result : result.rows[0],status : '200'});
  } 
  catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error in updation',status : 500 });
  }
};

const getProductById = async (req, res) => {
  try {
    const result = await productService.getProductById(req.params.id);
     res.status(200).json({ message: 'Data fetched successfully',result :result.rows[0],status : '200'}); 
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error Selectings data' });
  }
};


module.exports = {
  insertCartData,
  deleteCartByCarId,
  selectCartByCarId,
  getAllCart,
  getAllCategory,
  selectProductByCategory,
  selectAllProduct,
  deleteProductById,
  addNewProduct,
  insertCategory,
  deleteCategoryId,
  updateCategory,
  getProductById,
  updateProduct
};
