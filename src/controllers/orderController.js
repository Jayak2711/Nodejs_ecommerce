const orderService = require('../services/orderService');
const pool = require('../config/db');

const getAllOrderAdmin = async (req, res) => {
  console.log(req)
  try {
    const user = await orderService.getAllOrderAdmin();
    res.status(200).json({'message':'',result:user.rows,'status':200});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrderWithUserId = async (req, res) => {
  try {
    const user = await orderService.getAllOrderWithUserId(req.params.id );
    res.status(200).json({'message':'',result:user.rows,'status':200});
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
};

const getorderWithDate = async (req, res) => {
  try {
    const count = await orderService.getorderWithDate(req.body);
    console.log('-------------------------',count)
    res.status(200).json({'message' : 'Count',sale :count.rows.length,status : 'success'});
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
};

const insertOrderRec = async (req, res) => {
  try {
    const result = await orderService.insertOrderRec(req.body);
    res.status(200).json({ message: 'Data inserted successfully',result : result.rows[0],status : '200'});
  } 
  catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Error inserting data' });
  }
};


const insertAllCartRec = async (req, res) => {
  try {
    const result = await orderService.insertAllCartRec(req.body);
    console.log(result)
    res.status(200).json({ message: 'Data inserted successfullyss',result : result,status : '200'});
  } 
  catch (error) {
    await pool.query('ROLLBACK');
    console.error(error)
    res.status(500).json({ error: 'Error inserting data' });
  }
};

module.exports = {
    getAllOrderAdmin,
    getAllOrderWithUserId,
    getorderWithDate,
    insertOrderRec,
    insertAllCartRec
}