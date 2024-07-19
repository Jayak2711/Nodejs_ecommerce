const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'Jaya@123',
  port: 5432,
});

 (async() => {
    try{
         await pool.connect();
    }
    catch(err){
        console.error(err)
    }
    // finally{
    //     client.release();
    // }

    // pool.end();
 
 })();

module.exports = pool;
