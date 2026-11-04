const { randomUUID } = require('node:crypto');
const db = require('../db/queries');
const { body, params, validationResult, matchedData } = require('express-validator');

const links = [
    // { href: '/', text: 'Home' },
    { href: '/new', text: 'New Message' },
];

const alphaErr = 'must only contain letters.';
const userLengthErr = 'must be between 2 and 10 characters.';
const messageLengthErr = 'must be between 2 and 200 characters.';


const validateMessage = [
    body('username').trim()
        .isAlpha().withMessage(`Username ${alphaErr}`)
        .isLength({ min: 2, max: 10 }).withMessage(`User ${userLengthErr}`)
        .escape(),
    body('text').trim()
        .isLength({ min: 2, max: 200 }).withMessage(`Message text ${messageLengthErr}`)
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