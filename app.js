const express = require('express');
const path = require('node:path');

const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

const links = [
    { href: '/', text: 'Home' },
    { href: '/new', text: 'New Message' },
]

app.get('/', (req, res) => {
    res.render('pages/index', { pageTitle: 'Home', links });
});

app.get('/new', (req, res) => {
    res.render('pages/new', { pageTitle: 'New Message', links } );
});

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Mini Message Board listening to port ${PORT}`);
});