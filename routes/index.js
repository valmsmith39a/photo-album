var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', authMiddleware, function(req, res, next) {
  console.log("User: ", req.user);
  res.render('index', { title: "Clark and George's Trading Post", user: req.user});
});

router.get('/login', function(req, res, next) {
  // res.render('login');
  res.render('login', {state: 'login', title: "Login"});
});

router.get('/register', function(req, res, next) {
  // res.render('register');
  res.render('register',  { title: "", user: req.user});
});

router.get('/secret', authMiddleware, function(req, res, next) {
  console.log('req.user:', req.user);
  res.send('Wooo!  Secret stuff!!!');
});

router.get('/dashboard', function(req, res)  {
  console.log('in dashboard');
  res.render('dashboard');
});

router.get('/people/first/:limit', function(req, res, next) {
  console.log("get first "+req.params.limit+" people");
  Person.find({}, function(err, people){
    res.status(err ? 400 : 200).send(err || people);
  }).limit(req.params.limit);
});

router.get('/people/restaurant', function(req, res, next) {
  console.log("get restaurant");
  Person.find({occupation: {$in: ['cook', 'dishwasher', 'waiter']}}, function(err, people){
    res.status(err ? 400 : 200).send(err || people);
  });
});

router.get('/people/chain', function(req, res, next) {
  console.log("get chain");
  Person
  .find({occupation: {$in: ['cook', 'dishwasher', 'waiter']}})
  .limit(10)
  .sort({age: -1})
  .exec(function(err, people){
    res.status(err ? 400 : 200).send(err || people);
  });
});

router.post('/people', function(req, res, next) {
  Person.create(req.body, function(err, person) {
    console.log();
    res.status(err ? 400 : 200).send(err || person);
  })
});

// Clean
router.get('/people', function(req, res, next) {

  if (req.query.sort) {
    var sortObj = {};
    sortObj[req.query.sort] = req.query.desc ? -1 : 1;
  };

  if (req.query.limit) {
    var limit = parseInt(req.query.limit);
  };

  delete req.query.sort;
  delete req.query.desc;
  delete req.query.limit;

  Person
  .find(req.query).limit(limit).sort(sortObj)
  .exec(function(err, people){
    res.status(err ? 400 : 200).send(err || people);
  });
});

module.exports = router;
