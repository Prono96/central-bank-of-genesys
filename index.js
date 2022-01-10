const mongoose = require('mongoose');
const Joi = require('joi');
const centralbankgenesys = require('./routes/centralbankgenesys')
const express = require('express');
const app = express();

mongoose.connect('mongodb://localhost/CBG')
.then(() => console.log('Connected to the database....'))
.catch((err) => console.error('Could not connect to the database', err));



app.use(express.json());
app.use('/api/centralbankgenesys', centralbankgenesys);
app.use('/', centralbankgenesys);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


