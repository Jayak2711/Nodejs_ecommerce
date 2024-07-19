const pool = require('../config/db');


const getUserById = async (id) => {
    const data = await pool.query('SELECT * FROM public.user_tbl WHERE user_id = $1 ', [id]);
    return data;
};

const getUserbyMail = async (id) => {
 const userCred = id.email ;
 const data = await pool.query(`SELECT * FROM public.user_tbl WHERE email_id= $1`, [userCred]);
 return data;
};


const forgetPasswordByEmail = async (id) => {
  const userCred = id.email ;
  const data = await pool.query(`SELECT * FROM public.user_tbl WHERE email_id= $1`, [userCred]);
  return data;
 };

 constChangePasswordByEmail =  async (id) => {
  const userCred = id ;
  const data = await pool.query(`UPDATE public.user_tbl SET password = $2 WHERE email_id = $1`,[userCred]);
  return data;
 };



module.exports = {
  getUserById,
  getUserbyMail,
  forgetPasswordByEmail,
  constChangePasswordByEmail

};
