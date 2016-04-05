var express = require('express');
var router = express.Router();

/* GET process_get. */
router.get('/', function(req, res, next) {
    res.render('process_get', { 'first_name':req.query.first_name,'last_name':req.query.last_name,'file_name':req.query.file_name,'email':req.query.email });
});

module.exports = router;
