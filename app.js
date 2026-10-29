const express = require('express');
const { randomUUID } = require('node:crypto');
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
        id: randomUUID(),
        text: "Hi there!",
        user: "Sagi",
        added: new Date()
    },
    {
        id: randomUUID(),
        text: "Hello World!",
        user: "Nana",
        added: new Date()
    }
]

async function getMessageById(messageId) {
    return messages.find(message => message.id === messageId);
}

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

app.post('/new', (req, res) => {
    const messageText = req.body.messageText;
    const messageUser = req.body.messageUser;
    
    messages.push({ text: messageText, user: messageUser, added: new Date() });
    res.redirect('/');
})

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Mini Message Board listening to port ${PORT}`);
});