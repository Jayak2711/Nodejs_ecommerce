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
  console.log('----------------------------',req)
  try {
    const user = await orderService.getAllOrderWithUserId(req.params.id);
    res.status(200).json({'message':'',result:user.rows,'status':200});
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
};

const getorderWithDate = async (req, res) => {
  try {
    const count = await orderService.getorderWithDate(req.body);
    res.status(200).json({'message' : 'Count',result:count.rows,sale :count.rows.length,status : 'success'});
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message });
  }
};

const paymentWithUserId = async (req, res) => {
  try { 
    const count = await orderService.paymentWithUserId(req.params.id );
    res.status(200).json({'message' : 'Count',result:count.rows,result :count.rows,status : 'success'});
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
    res.status(200).json({ message: 'Data inserted successfullyss',result : result.rows,status : '200'});
  } 
  catch (error) {
    await pool.query('ROLLBACK');
    console.error(error)
    res.status(500).json({ error: 'Error inserting data' });
  }
};

const getOrderIdForPayment = async(req,res) => {
  try {
    const user = await orderService.getOrderIdForPayment(req.params.id);
    res.status(200).json({'message':'',result:user.rows,'status':200});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

const insertIntoPaymentWithUSerId = async (req, res) => {
  console.log(req.body)
  try {
    const result = await orderService.insertIntoPaymentWithUSerId(req.body);
    if(result){
      const order =  await orderService.updateOrderTable(req.body);
    res.status(200).json({ message: 'Payment Success',result : order,status : '200'});
  } 
}
  catch (error) {
    await pool.query('ROLLBACK');
    res.status(500).json({ error: 'Error inserting data' });
  }
};

const categoryReport = async(req,res) => {
  console.log(req)
  try {
    const user = await orderService.categoryReport();
    console.log('rows.....................',user)
    res.status(200).json({'message':'',result:user.rows,'status':200});
  } catch (error) {
    res.status(500).json({ error: error });
  }
}



module.exports = {
    getAllOrderAdmin,
    getAllOrderWithUserId,
    getorderWithDate,
    insertOrderRec,
    insertAllCartRec,
    insertIntoPaymentWithUSerId,
    getOrderIdForPayment,
    paymentWithUserId,
    categoryReport
}