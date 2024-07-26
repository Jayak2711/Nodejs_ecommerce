const userService = require('../services/userService');

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(200).json({'message':'sucess',result : user.rows,'status' :200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getUserbyMail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body);
    console.log(user)
    const arr = user.rows;
    if(arr.length  ==  0){
      return  res.status(200).json({
        error: "Email doesnot exist",
        status : 'failed'
        });
    }else{
      let enteredPass = req.body.password;
      uPass = user.rows[0].password;
      if (enteredPass == uPass) {
        res.status(200).json({message : 'Login Successfully done',result :(user.rows[0]),status:'success'});
      }
      else {
        res.status(200).json({message : "Email id or password incorrect!",status:'failed',result:'incorrectPass'});
        console.log("wrong login");
      }
    }
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const forgetPasswordByEmail = async (req, res) => {
  console.log('sadasdsads',req.body)
  try {
    const user = await userService.getUserByEmail(req.body);
    console.log('sadasdasdsa',user)
    const arr = user.rows;
    if(arr.length  ==  0){
      return  res.status(200).json({
        error: "Email doesnot exist",
        status : 'failed'
        });
    }else{
      res.status(200).json({message : 'Email verified Successfully',result :(user.rows[0]),status:'success'});
    }
   
  } catch (error) {
    res.status(500).json({error: error.message,status:'failed'});
  }
};

const updateUserById = async (req, res) => {
  try {
    const updatedUser = req.body;
    const user = await userService.updateUserById(updatedUser);
    res.status(200).json({ 'message': 'User details updated successfully', user : user,status : 200 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAddressById = async (req, res) => {
  try {
    const updatedUser = req.body;
    const user = await userService.updateArressById(updatedUser);
    res.status(200).json({ 'message': 'User details updated successfully', user : user,user : user,status : 200 });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};


const ChangePasswordByUserId = async (req, res) => {
  try {
    const user = await userService.ChangePasswordByUserId(req.body);
      res.status(200).json({message : 'Password updated Succesfully',result :(user.rows[0]),status:'success'});
   
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message,status:'failed' });
  }
};

const insertUserAddress = async (req, res) => {
  try {
    const result = await userService.insertUserAddress(req.body);
    res.status(200).json({ message: 'Data inserted successfully',result : result.rows[0],status : 200});
  } 
  catch (error) {
    console.error('Error executing query', err.stack);
    await pool.query('ROLLBACK');
    console.error('Error executing query', err.stack);
    res.status(500).json({ error: 'Error inserting data' });
  }
};



module.exports = {
  getUser,
  getUserbyMail,
  forgetPasswordByEmail,
  ChangePasswordByUserId,
  updateUserById,
  updateAddressById,
  insertUserAddress
};
