var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');  
var db = require('../model/db');
var User=mongoose.model('User', db.userSchema);  

/* GET home page. */
router.get('/', function(req, res, next) {
 res.render("login", {title: "User Login!"});
});

router.get('/about', function(req, res, next) {
 res.render("about", {title: "About Us!",description:'This is Sample About Us Page !'});
});
router.get('/Authenticate', function(req, res, next) {
  res.render('process_get', { 'first_name':"",'last_name':"",'email':"", 'file_name':""});
});

router.post("/Authenticate", function(req, res, next){
 
    console.log(req.body.email);  console.log(req.body.password);
      User.findOne({ 'email': req.body.email, 'password': req.body.password}, 'firstname lastname email logo', function (err, person) {
          console.log(person)
                if (err) return handleError(err);
                      res.render('process_get', { 'first_name':person.firstname,'last_name':person.lastname,'email':person.email, 'file_name':person.logo });
            
    });
    
});
router.get('/signup', function(req, res) {
  res.render("index", {title: "User SignUp!",first_name:'', last_name:'', email:''});
}); 
module.exports = router;
