const pool = require('../config/db');


const getUserById = async (id) => {
    const data = await pool.query(`select u.user_id,u.is_admin,u.phone_number,u.email_id,u.first_name,u.last_name,u.user_name,u.date_of_birth,
a.address1,a,address2,a.state,a.district,a.country,a.pincode,a.landmark FROM public.user_tbl u
JOIN public.address_tbl a ON u.user_id = a.user_id WHERE u.user_id = $1`, [id]);
    return data;
};

const getUserbyMail = async (id) => {
 const userCred = id.email ;
 const data = await pool.query(`SELECT * FROM public.user_tbl WHERE email_id= $1`, [userCred]);
 return data;
};


const forgetPasswordByEmail = async (id) => {
  const userCred = id.email ;
  console.log(userCred)
  const data = await pool.query(`SELECT * FROM public.user_tbl WHERE email_id= $1`, [userCred]);
  return data;
 };

 const ChangePasswordByUserId =  async (id) => {
  const userCred = id ;
  const data = await pool.query(`UPDATE public.user_tbl SET password = $1 WHERE user_id = $2`,[userCred.password,userCred.user_id]);
  return data;
 };

 const updateUserById = async (user) => {
  const { user_id, user_name, email_id, password, first_name, last_name, phone_number } = user;
  const data = await pool.query(
    `UPDATE public.user_tbl
     SET user_name = $2, email_id = $3, password = $4, first_name = $5, last_name = $6, phone_number = $7
     WHERE user_id = $1
     RETURNING *`,
    [user_id, user_name, email_id, password, first_name, last_name, phone_number]
  );
  return data.rows[0];
};
 

module.exports = {
  getUserById,
  getUserbyMail,
  forgetPasswordByEmail,
  ChangePasswordByUserId,
  updateUserById

};
