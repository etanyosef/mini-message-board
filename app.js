const express = require('express');
const path = require('node:path');

const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

const messages = [
    {
        text: "Hi there!",
        user: "Sagi",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Nana",
        added: new Date()
    }
]

const links = [
    { href: '/', text: 'Home' },
    { href: '/new', text: 'New Message' },
]

app.get('/', (req, res) => {
    res.render('pages/index', { pageTitle: 'Mini Messageboard', links, messages });
});

app.get('/new', (req, res) => {
    res.render('pages/form', { pageTitle: 'New Message', links } );
});

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Mini Message Board listening to port ${PORT}`);
});