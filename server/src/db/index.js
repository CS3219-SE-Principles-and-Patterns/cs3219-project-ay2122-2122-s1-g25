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
    PROD: {
        host: '/cloudsql/upskill-prod:asia-southeast1:upskill-db-prod',
        user: 'postgres',
        password: 'upskill-db-prod-pw',
        database: 'upskill-db',
        socketPath:
        '/cloudsql/upskill-prod:asia-southeast1:upskill-db-prod',
    },
}
  
const pool = new Pool(config[process.env.NODE_ENV])

module.exports = pool;