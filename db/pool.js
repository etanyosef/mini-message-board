const { Pool } = require('pg');

module.exports = new Pool({
    host: 'localhost',
    database: 'top_users',
    user: 'ethan',
    password: 'asdasd123',
    port: 5432, // default port
});