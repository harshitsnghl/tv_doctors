var express = require('express');
var router = express.Router();
var json = require('../public/db.json').cities;
router.get('/', function(req, res, next) {
  res.send(json);
});

module.exports = router;
