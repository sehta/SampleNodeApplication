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

router.post("/login", function(req, res, next){
 
    console.log(req.body.email);
   var getUser= User.find({email:"umeshsehta786@yahoo.com" });
    User.findOne({ 'email': 'umeshsehta786@yahoo.com' }, 'firstname lastname email logo', function (err, person) {
                if (err) return handleError(err);
        console.log('%s %s is yours name & email is %s.', person.firstname, person.lastname, person.email);
              res.render('process_get', { 'first_name':person.firstname,'last_name':person.lastname,'email':person.email, 'file_name':person.logo });
            
    });
    
});
router.get('/signup', function(req, res) {
  res.render("index", {title: "User SignUp!",first_name:'', last_name:'', email:''});
}); 
module.exports = router;
