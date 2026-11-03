const pool = require('./pool');

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
}

async function createNewMessage(username, text) {
    await pool.query('INSERT INTO messages (username, text) VALUES ($1, $2)', [username, text]);
}
