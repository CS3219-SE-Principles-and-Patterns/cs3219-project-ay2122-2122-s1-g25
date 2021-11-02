const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const config = {
    DEV: {
        host: 'database',
        port: 5432,
        user: 'upskill_user',
        password: 'upskill_pw',
        database: 'upskill_db',
    },
    TEST: {
        host: 'localhost',
        port: 5434,
        user: 'upskill_user',
        password: 'upskill_pw',
        database: 'upskill_db',
    },
    PROD: {
        host: process.env.PROD_DB_HOST,
        user: process.env.PROD_DB_USER,
        password: process.env.PROD_DB_PW,
        database: process.env.PROD_DB_DBNAME,
        socketPath: process.env.PROD_DB_SOCKET,
    },
}

const pool = new Pool(config[process.env.NODE_ENV])

module.exports = pool;