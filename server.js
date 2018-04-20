'use strict';

// Application dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
require('dotenv').config();

// Application Setup
const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

// Database Setup
app.use(express.urlencoded({extended:true}));
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

// Application Middleware
app.use(cors());

// API Endpoints
app.get('/api/v1/books', (req, res) => { // this is an ajax call
  client.query('SELECT book_id, title, author, image_url, isbn FROM books;') //this uses PG to send client queries. 
    .then(results => res.send(results.rows))//this is an ajax get promis return, when pg is sent on line 24, then given a responpse or callback, it then does what is inside the .then()
    .catch(console.error);// .catch is an error response promise.
});

app.get('/api/v1/books/:id', (req, res) => {
  client.query(`SELECT * FROM books WHERE book_id=${req.params.id};`)
    .then(results => res.send(results.rows));
});

app.get('*', (req, res) => res.redirect(CLIENT_URL));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));


//app.post
// insert into things (name) vlaues(${req.body.name});

// ctx = context.  this can "smush" together res and req into one.