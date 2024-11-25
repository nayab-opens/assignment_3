var express = require('express');
var router = express.Router();
const Workout = require('../model/workout');
/* GET splash page. */
router.get('/', function(req, res, next) {
  res.render('splash', { title: 'Splash Page' });
});

/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render('home', { title: 'Home Page' }); // Passes the title dynamically to home.ejs
});

/* GET About page. */
router.get('/aboutus', function(req, res, next) {
  res.render('aboutus', { title: 'About us' });
});

/* GET products page. */
router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Products' });
});
/* GET service page. */
router.get('/service', function(req, res, next) {
  res.render('service', { title: 'Service' });
});
/* GET contactus page. */
router.get('/contactus', function(req, res, next) {
  res.render('contactus', { title: 'Contact Us' });
});

/* GET public page for workouts. */
router.get('/public-workouts', async (req, res) => {
  try {
    // Fetch all workouts from the collection
    const workouts = await Workout.find();
    res.render('public-workouts', { title: 'Public Workouts', workouts }); // Render the view
  } catch (err) {
    console.error('Error fetching workouts:', err);
    res.status(500).send('An error occurred while fetching workouts.');
  }
});

module.exports = router;
