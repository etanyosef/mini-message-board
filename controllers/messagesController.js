const { randomUUID } = require('node:crypto');

const links = [
    // { href: '/', text: 'Home' },
    { href: '/new', text: 'New Message' },
];

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
];

exports.getMessages = (req, res) => {
    res.render('pages/index', {
        pageTitle: 'Messages',
        links,
        messages,
    })
}