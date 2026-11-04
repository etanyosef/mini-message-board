const express = require('express');
const app = express();
const path = require('node:path');

const messagesRouter = require('./routes/messegesRouter');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use('/', messagesRouter);

app.use((req, res) => {
    res.status(404).render('pages/404', { 
        pageTitle: '404', 
        errorMessage: 'Oops! Page not found. :(' 
    });
})

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`Mini Message Board listening to port ${PORT}`);
});