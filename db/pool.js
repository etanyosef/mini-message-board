const { Pool } = require('pg');

module.exports = new Pool({
    host: 'localhost',
    database: 'mini_messageboard',
    user: 'ethan',
    password: 'asdasd123',
    port: 5432, // default port
});