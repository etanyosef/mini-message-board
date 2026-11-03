const { randomUUID } = require('node:crypto');
const db = require('../db/queries');

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
    });
}

exports.newMessageGet = (req, res) => {
    res.render('pages/form', { pageTitle: 'New Message', links } );
}

exports.newMessagePost = async (req, res) => {
    const { username, text } = req.body;
    await db.createNewMessage(username, text);
    res.redirect('/');
}

exports.getMessageById = async (req, res) => {
    const { id } = req.params;
    const message = await db.getMessage(id);
    
    if (!message[0]) {
        res.status(404).render('pages/404', { pageTitle: '404', links, errorMessage: 'Message not found or does not exist.' })
        return;
    }

    res.render('pages/message', { pageTitle: 'Message Details', links, message: message[0]});
}