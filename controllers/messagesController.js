const { randomUUID } = require('node:crypto');

const links = [
    // { href: '/', text: 'Home' },
    { href: '/new', text: 'New Message' },
];

exports.getMessages = async (req, res) => {
    const messages = await db.getAllMessages();
    console.log(messages);
    res.render('pages/index', {
        pageTitle: 'Messages',
        links,
        messages,
    })
}