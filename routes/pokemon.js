var express = require('express');
var router = express.Router();

var authMiddleware = require('../config/auth');

router.use(authMiddleware);

/* GET home page. */
router.get('/', function(req, res, next) {
  // show my pokemon
});

router.post('/', function(req, res, next) {
  // add pokemon to user
});







module.exports = router;
