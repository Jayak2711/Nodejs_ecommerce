const pool = require('../config/db');

const insertCartByProdId = async(res) => {
  const keys = Object.keys(res);
  const values = Object.values(res);
  const placeholders = keys.map((key, index) => `$${index + 1}`).join(', ');
  let data =  pool.query(`INSERT INTO public.cart_tbl (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`,values);
  await pool.query('COMMIT');
  return data;
  }
  

  const addNewProduct = async(res) => {
    const keys = Object.keys(res);
    const values = Object.values(res);
    const placeholders = keys.map((key, index) => `$${index + 1}`).join(', ');
    let data =  pool.query(`INSERT INTO product (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`,values);
    await pool.query('COMMIT');
    return data;
    }

    const updateProduct = async(res) => {
      const { id, ...fields } = res;
      let query = 'UPDATE public.product SET ';
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
      query += ' WHERE id = $' + index++;
      params.push(id);
      query += ' RETURNING *';
    
      // Execute the query with dynamically built SQL and parameters
      const result = await pool.query(query, params);
      return result;
    }

    const inserCategory = async(res) => {
      const keys = Object.keys(res);
      const values = Object.values(res);
      const placeholders = keys.map((key, index) => `$${index + 1}`).join(', ');
      let data =  pool.query(`INSERT INTO public.category (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`,values);
      await pool.query('COMMIT');
      return data;
      }
  
const deleteCartByProdId = async(res) => {
  const ids = res;
  const text = 'DELETE FROM public.cart_tbl WHERE cart_id = ANY($1) RETURNING *';
  const data = await pool.query(text, [ids]);
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
  let data = await pool.query(`SELECT * FROM product where categoryid = $1 `,[id]);
  return data;
}

const selectAllProduct = async() => {
  let data = await pool.query(`SELECT * FROM product`);
  return data;
}

const getProductById = async(res) => {
  let data = await pool.query(`SELECT * FROM product WHERE id = $1`,[res]);
  return data;
}

const deleteProductById = async(res) => {
  const id = res;
  let data =   pool.query('DELETE FROM product WHERE id = $1', [id]);
  return data;
}

const deleteCategory = async(res) => {
  console.log(res)
  const id = res;
  let data =   pool.query('DELETE FROM public.category WHERE id = $1', [id]);
  return data;
}

const updateCategory =  async (id) => {
  const userCred = id ;
  const data = await pool.query(`UPDATE public.category SET description = $1,name = $2 WHERE id = $3`,[userCred.description,userCred.name,userCred.id]);
  return data;
 };
 


module.exports = {
    insertCartByProdId,
    deleteCartByProdId,
    selectCartByUserId,
    getAllCartRecord,
    getAllCategory,
    selectProductByCategory,
    selectAllProduct,
    deleteProductById,
    addNewProduct,
    inserCategory,
    deleteCategory,
    updateCategory,
    getProductById,
    updateProduct
};
