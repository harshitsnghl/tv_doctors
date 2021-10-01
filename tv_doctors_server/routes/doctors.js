var express = require('express');
var router = express.Router();
var json = require('../public/db.json').doctors;

router.get('/', function(req, res, next) {
  res.send(json);
});

module.exports = router;
