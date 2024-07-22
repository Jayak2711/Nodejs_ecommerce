const pool = require('../config/db');

const getAllOrderAdmin = async (id) => {
    const data = await pool.query(`SELECT u.id, u.created_on,u.payment_mode,u.p_id,d.price,u.quantity
FROM public.order_tbl u 
JOIN product d ON u.p_id = d.id`);
    return data;
};

const getAllOrderWithUserId = async (id) => {
    console.log(id)
    const data = await pool.query(`SELECT u.id, u.created_on,u.payment_mode,u.p_id,d.price,u.quantity
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


const insertAllCartRec = async(res) => {
    const data  = res;
    console.log('sdadasdas',data[0])
    if (!Array.isArray(data) || data.some(row => typeof row !== 'object')) {
        throw new Error('Data should be an array of objects');
      }
      const text = 'INSERT INTO your_table_name (payment_mode, quantity, user_id, p_id, created_on) VALUES ';
      const values = [];
      const placeholders = data.map((row, index) => {
        const valueString = Object.values(row).map((_, colIndex) => `$${index * Object.keys(row).length + colIndex + 1}`).join(', ');
        values.push(...Object.values(row));
        return `(${valueString})`;
      }).join(', ');
      const query = text + placeholders;
    return query;
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