const pool = require('../config/db');

const getAllOrderAdmin = async (id) => {
//     const data = await pool.query(`SELECT u.id, u.created_on,u.p_id,d.price,u.quantity,u.user_id,d.name
// FROM public.order_tbl u 
// JOIN product d ON u.p_id = d.id`);
//     return data;
        const data = await pool.query(
            `SELECT 
        p.id AS payment_id,
        p.created_on AS payment_created_on,
        p.payment_method AS payment_method,
        p.status AS payment_status,
        o.id AS order_id,
        o.p_id AS product_id,
        o.status AS order_status,
        o.user_id AS order_user_id,
        o.quantity AS order_quantity,
        r.name AS product_name,
        r.price AS product_price
        FROM 
        public.payments p
        JOIN 
        LATERAL jsonb_array_elements_text(p.order_is::jsonb) AS order_is_element ON TRUE
        JOIN 
        public.order_tbl o ON o.id = order_is_element::int
        JOIN 
        product r ON o.p_id = r.id`);
        return data;
};

const getAllOrderWithUserId = async (id) => {
    const data = await pool.query(`SELECT u.id, u.created_on,u.p_id,d.price,d.name
            FROM public.order_tbl u 
            JOIN product d ON u.p_id = d.id  WHERE u.user_id =$1`, [id]);
    return data;
};

const paymentWithUserId = async (id) => {
    const data = await pool.query(
        `SELECT 
    p.id AS payment_id,
    p.created_on AS payment_created_on,
    p.payment_method AS payment_method,
    p.status AS payment_status,
    o.id AS order_id,
    o.p_id AS product_id,
    o.status AS order_status,
    o.user_id AS order_user_id,
    o.quantity AS order_quantity,
    r.name AS product_name,
    r.price AS product_price
FROM 
    public.payments p
JOIN 
    LATERAL jsonb_array_elements_text(p.order_is::jsonb) AS order_is_element ON TRUE
JOIN 
    public.order_tbl o ON o.id = order_is_element::int
JOIN 
    product r ON o.p_id = r.id
WHERE 
    o.user_id = $1`, [id]);
    return data;
};


const getorderWithDate = async (id) => {
    const date = id.created_on;
    const data = await pool.query(`select * from public.order_tbl where created_on = $1`, [date]);
    return data;
};

const insertOrderRec = async (res) => {
    const keys = Object.keys(res);
    const values = Object.values(res);
    const placeholders = keys.map((key, index) => `$${index + 1}`).join(', ');
    let data = pool.query(`INSERT INTO public.order_tbl (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`, values);
    await pool.query('COMMIT');
    return data;
}


const insertAllCartRec = async (data) => {
    const baseQuery = 'INSERT INTO public.order_tbl (quantity, user_id, p_id, created_on,status) VALUES ';
    let values = [];
    let query = baseQuery;
    const placeholders = data.map((row, rowIndex) => {
        const rowPlaceholders = Object.values(row).map((_, colIndex) => `$${rowIndex * Object.keys(row).length + colIndex + 1}`).join(', ');
        values.push(...Object.values(row));
        return `(${rowPlaceholders})`;
    }).join(', ');

    query += placeholders + ' RETURNING *;';
    const restultData = await pool.query(query, values);
    return restultData;

}

const getOrderIdForPayment = async (id) => {
    const date = id.created_on;
    const data = await pool.query(`select * from public.order_tbl where id = $1`, [date]);
    return data;
};


const insertIntoPaymentWithUSerId = async (res) => {
    const orderIdsJson = JSON.stringify(res.order_id);
    console.log(orderIdsJson)
    let data = pool.query('INSERT INTO public.Payments (created_on, payment_method, status, order_is) VALUES ($1, $2, $3, $4)',
        [res.created_on, res.payment_method, res.status, orderIdsJson])
    await pool.query('COMMIT');
    return data;
}

const updateOrderTable = async (res) => {
    const order_id = res.order_id
    console.log('+++++++++++++++++++++++++++++++',order_id)
    const query = `
                  UPDATE public.order_tbl
                  SET status = 'Success'
                  WHERE status = 'Placed' AND id = ANY($1::int[])`;
                  const values = [order_id];
    const result = await pool.query(query, values);
    return result;
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
    updateOrderTable
}