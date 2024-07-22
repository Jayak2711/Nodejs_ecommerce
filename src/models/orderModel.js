const pool = require('../config/db');

const getAllOrderAdmin = async (id) => {
const data = await pool.query(`SELECT u.id, u.created_on,u.payment_mode,u.p_id,d.price,u.quantity,u.user_id,d.name
FROM public.order_tbl u 
JOIN product d ON u.p_id = d.id`);
    return data;
};

const getAllOrderWithUserId = async (id) => {
    const data = await pool.query(`SELECT u.id, u.created_on,u.payment_mode,u.p_id,d.price,u.quantity,d.name
            FROM public.order_tbl u 
            JOIN product d ON u.p_id = d.id  WHERE u.user_id =$1`,[id]);
    return data;
};

const getorderWithDate = async (id) => {
    const date = id.created_on ;
    const data = await pool.query(`select * from public.order_tbl where created_on = $1`,[date]);
    return data;
};

const insertOrderRec = async(res) => {
    const keys = Object.keys(res);
    const values = Object.values(res);
    const placeholders = keys.map((key, index) => `$${index + 1}`).join(', ');
    let data =  pool.query(`INSERT INTO public.order_tbl (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`,values);
    await pool.query('COMMIT');
    return data;
    }


const insertAllCartRec = async(data) => {
    const baseQuery = 'INSERT INTO public.order_tbl (payment_mode, quantity, user_id, p_id, created_on) VALUES ';
    let values = [];
    let query = baseQuery;

    // Construct the placeholders and values
    const placeholders = data.map((row, rowIndex) => {
      const rowPlaceholders = Object.values(row).map((_, colIndex) => `$${rowIndex * Object.keys(row).length + colIndex + 1}`).join(', ');
      values.push(...Object.values(row));
      return `(${rowPlaceholders})`;
    }).join(', ');

    query += placeholders + ' RETURNING *;';

    console.log('Constructed Query:', query);
    console.log('Values:', values);

    const restultData = await pool.query(query, values);
    return restultData;

    }

// let data = await pool.query(`SELECT u.oder_id, u.created_on,u.payment_mode, c.user_id,c.p_id,c.quantity,d.price  
//     FROM  public.oder_tbl u JOIN public.cart_tbl c ON u.cart_id = cart.id WHERE user_id = $1`,[id]);

module.exports = {
    getAllOrderAdmin,
    getAllOrderWithUserId,
    getorderWithDate,
    insertOrderRec,
    insertAllCartRec
}