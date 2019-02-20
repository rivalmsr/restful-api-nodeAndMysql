const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser  = require('body-parser');
const mysql = require('mysql');
const path  = require('path');
const app   = express();

const {getHomePage} = require('./routes/index');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./routes/player');
const port = 5000;
// create connection to database
// the mysql.createConnection function takes in a configuration object witch contains host, user, password and the database name.
const db = mysql.createConnection({
  host : 'localhost',
  port : 5000,
  username : 'root',
  password : '',
  database : 'dbjavascript'
});

// connect to database
db.connect((err) => {
  if(err){
    throw err;
  }
    console.log('connected to database');
});
global.db = db;

// configuration middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our views
app.set('view-engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public
app.use(fileUpload()); // configure fileUpload

// routes for the app
app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:id', editPlayerPage);
app.get('/delete/:id', deletePlayer);
app.post('/add', addPlayer);
app.post('/edit/:id', editPlayer);

// set the app to listen on the port
app.listen(port, ()=> {
  console.log('Server running on port :' + port);
});
