const { Client } = require('pg');

const SQL = `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR ( 50 ),
        text TEXT,
        added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    INSERT INTO messages (username, text)
    VALUES
        ('Sagi', 'Hello World!'),
        ('Nana', 'Hi there!'),
        ('Powder', 'What''s up!');
`;

const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

async function main() {
    console.log('Seeding...');
    const client = new Client({
        connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('Done');
}

main();