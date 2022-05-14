const express = require('express');
const morgan = require('morgan');
var cors = require('cors')

// App
const app = express();
// Morgan
app.use(morgan('tiny'));
// Cors
app.use(cors());
// First route
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes/index.routes'));

// const nano = require('nano')('http://admin:admin@172.26.130.106:5984/');
// const db = nano.db.use('twitter');
// app.get('/api/v1/twitter', (rqs, res) => {
//     console.log("here")
//     db.view('newDoc', 'newView', (err, body) => {
//         if(!err) {
//             res.json(body.rows[0].value[0]);
//         }
//     })
// }) 



// Starting server
app.listen(process.env.PORT | 8000);