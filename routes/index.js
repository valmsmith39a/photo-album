var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', authMiddleware, function(req, res, next) {
  res.render('index', { title: "Carousel", user: req.user});
});

router.get('/login', function(req, res, next) {
  res.render('login', {state: 'login', title: "Login"});
});

router.get('/register', function(req, res, next) {
  res.render('register',  { title: "", user: req.user});
});

router.get('/secret', authMiddleware, function(req, res, next) {
  res.send('Wooo!  Secret stuff!!!');
});

router.get('/resetpass', function(req, res, next) {
  res.render('resetpass');
});

module.exports = router;

