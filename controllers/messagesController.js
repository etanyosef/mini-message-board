const db = require('../db/queries');
const { body, params, validationResult, matchedData } = require('express-validator');

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
        .escape(),
];

exports.getMessages = async (req, res) => {
    const messages = await db.getAllMessages();
    console.log(messages);
    res.render('pages/index', {
        pageTitle: 'Messages',
        messages,
    });
}

exports.newMessageGet = (req, res) => {
    res.render('pages/form', { pageTitle: 'New Message' } );
}

exports.newMessagePost = [
    validateMessage,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render('pages/form', {
                pageTitle: 'New Message',
                errors: errors.array(),
            });
        }

        const { username, text } = matchedData(req);
        await db.createNewMessage(username, text);
        res.redirect('/');
    }
];

exports.getMessageById = async (req, res) => {
    const { id } = req.params;
    const message = await db.getMessage(id);
    
    if (!message[0]) {
        return res.status(404).render('pages/404', { 
            pageTitle: '404', 
            errorMessage: 'Message not found or does not exist.',
        });
    }

    res.render('pages/message', { pageTitle: 'Message Details', message: message[0]});
}