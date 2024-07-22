const pool = require('../config/db');

const insertCartByProdId = async(res) => {
  const keys = Object.keys(res);
  const values = Object.values(res);
  const placeholders = keys.map((key, index) => `$${index + 1}`).join(', ');
  let data =  pool.query(`INSERT INTO public.cart_tbl (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`,values);
  await pool.query('COMMIT');
  return data;
  }
  
const deleteCartByProdId = async(res) => {
  const id = res;
  let data =   pool.query('DELETE FROM public.cart_tbl WHERE cart_id = $1', [id]);
  return data;
}



const selectCartByUserId = async(res) => {
  const id = res;
  let data = await pool.query(`SELECT u.user_id, u.quantity,u.cart_id, c.createdby,c.description, c.name, c.price,c.imageurl,u.p_id
    FROM  public.cart_tbl u JOIN product c ON u.p_id = c.id WHERE user_id = $1`,[id]);
  return data;
}



const getAllCartRecord = async() => {
  let data = pool.query('SELECT * FROM public.cart_tbl ORDER BY cart_id ASC ');
  return data ;
}

const getAllCategory = async() => {
  let data = pool.query(`SELECT * FROM public.category ORDER BY id ASC `);
  return data ;
}

const selectProductByCategory = async(res) => {
  const id = res;
  let data = await pool.query(`SELECT * FROM product where id = $1 `,[id]);
  return data;
}

const selectAllProduct = async() => {
  let data = await pool.query(`SELECT * FROM product`);
  return data;
}

const deleteProductById = async(res) => {
  const id = res;
  let data =   pool.query('DELETE FROM product WHERE id = $1', [id]);
  return data;
}




module.exports = {
    insertCartByProdId,
    deleteCartByProdId,
    selectCartByUserId,
    getAllCartRecord,
    getAllCategory,
    selectProductByCategory,
    selectAllProduct,
    deleteProductById
};
