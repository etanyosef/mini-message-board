require('dotenv').config();
const { Pool } = require('pg');

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_HOST || 5432;
const DB_NAME = process.env.DB_NAME || 'mini_messageboard';
const DB_USER = process.env.DB_USER || 'ethan';
const DB_PASSWORD = process.env.DB_PASSWORD || 'asdasd123';

module.exports = new Pool({
    host: DB_HOST,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT, 
});