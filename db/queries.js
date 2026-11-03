const pool = require('./pool');

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
}

async function createNewMessage(username, text) {
    await pool.query('INSERT INTO messages (username, text) VALUES ($1, $2)', [username, text]);
}

async function getMessage(id) {
    const { rows } = await pool.query('SELECT * FROM messages WHERE id = $1', [id]);
    return rows;
}

module.exports = {
    getAllMessages,
    createNewMessage,
    getMessage,
}