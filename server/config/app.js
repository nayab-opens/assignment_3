let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let app = express();
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let workoutRouter = require('../routes/workout');


// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
// getting-started.js
const mongoose = require('mongoose');
let DB = require('./db');
// point mongoose to the DB URI
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{
  console.log("Connected with the MongoDB")
});
mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true})
/* main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/BookLib');
  //await mongoose.connect('mongodb+srv://ahmedsheikh:Test123@cluster0.0f3pz.mongodb.net/');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}*/

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));



// Splash page route
app.get('/', function(req, res, next) {
  res.render('splash', { title: 'Splash Page' });
});

// Start Tracking button route
app.get('/start-tracking', function(req, res, next) {
  res.redirect('/home');
});

// Other pages routes
app.get('/home', function(req, res, next) {
  res.render('home', { title: 'Home Page' });
});

app.get('/aboutus', function(req, res, next) {
  res.render('aboutus', { title: 'About Us' });
});

app.get('/products', function(req, res, next) {
  res.render('products', { title: 'Products'});
});

app.get('/service', function(req, res, next) {
  res.render('service', { title: 'Service' });
});

app.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'Contact Us' });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/workoutslist',workoutRouter);
// /project --> projectrouter
// /contactus --> contactus

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title:'Error'});
});

module.exports = app;
