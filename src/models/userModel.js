const pool = require('../config/db');


const getUserById = async (id) => {
    const data = await pool.query(`select u.user_id,u.is_admin,u.phone_number,u.email_id,u.first_name,u.last_name,u.user_name,p.password,
      u.date_of_birth,
      a.address1,a,address2,a.state,a.district,a.country,a.pincode,a.landmark,a.id as addressId 
      FROM public.user_tbl u
      LEFT JOIN public.password_tbl p ON u.user_id = p.user_id
      LEFT JOIN public.address_tbl a ON u.user_id = a.user_id  WHERE u.user_id = $1`, [id]);
    return data;
};

const getUserbyMail = async (id) => {
 const userCred = id.email ;
 const data = await pool.query(`SELECT * FROM public.user_tbl WHERE email_id= $1`, [userCred]);
 return data;
};

const getPasswordFromPsswordTbl = async (id) => {
  const userCred = id ;
  console.log(id)
  const data = await pool.query(`SELECT * FROM public.password_tbl WHERE user_id = $1`, [userCred]);
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
 
  const { user_id, ...fields } = user;
  
  // Prepare dynamic SQL query and parameters
  let query = 'UPDATE public.user_tbl SET ';
  const params = [];
  let index = 1;

  // Iterate over fields to build the query and parameter list
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null) {
      query += `${key} = $${index++}, `;
      params.push(value);
    }
  }

  // Remove trailing comma and space
  query = query.slice(0, -2);
  query += ' WHERE user_id = $' + index++;
  params.push(user_id);

  query += ' RETURNING *';

  // Execute the query with dynamically built SQL and parameters
  const result = await pool.query(query, params);
  return result.rows[0];
};

const updateAddressById = async (user) => {
  const { user_id, ...fields } = user;
  let query = 'UPDATE public.address_tbl SET ';
  const params = [];
  let index = 1;

  // Iterate over fields to build the query and parameter list
  for (const [key, value] of Object.entries(fields)) {
    if (value !== undefined && value !== null) {
      query += `${key} = $${index++}, `;
      params.push(value);
    }
  }

  // Remove trailing comma and space
  query = query.slice(0, -2);
  query += ' WHERE user_id = $' + index++;
  params.push(user_id);

  query += ' RETURNING *';

  // Execute the query with dynamically built SQL and parameters
  const result = await pool.query(query, params);
  return result.rows[0];
};

const insertUserAddress = async(res) => {
  const keys = Object.keys(res);
  const values = Object.values(res);
  const placeholders = keys.map((key, index) => `$${index + 1}`).join(', ');
  let data =  pool.query(`INSERT INTO public.address_tbl (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`,values);
  await pool.query('COMMIT');
  return data;
  }



module.exports = {
  getUserById,
  getUserbyMail,
  forgetPasswordByEmail,
  ChangePasswordByUserId,
  updateUserById,
  updateAddressById,
  insertUserAddress,
  getPasswordFromPsswordTbl

};
