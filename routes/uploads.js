var express = require('express');
var multer  = require('multer')
var router = express.Router();
var util = require("util");
var fs = require("fs"); 
var path = require('path');
var crypto = require("crypto");
var mime= require("mime");
var ValidationErrors = require('../controller/validationerrors');
var mongoose = require('mongoose');  
//Create a schema for User
var User = mongoose.model('User');

//var upload = multer({ dest: 'uploads/' })
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});


var upload = multer({ storage: storage });


router.post("/upload", upload.array('myFile', 12), function(req, res, next){

    var file_name='';
	if (req.files.length) {
        
      file_name=req.files[0].filename;
        
     //Instantiating the Model - An instance of Model represents a mongodb document
        var user1 = new User({
                        firstname:req.body.first_name,
                        lastname: req.body.last_name,
                        email: req.body.email,
                        logo: file_name,
                        password:req.body.password
                    });

        //Saving the model instance to the DB
        user1.save(function(err){
            if (err) 
            {
                var errMessage = '';

                    // go through all the errors...
                    for (var errName in err.errors) 
                    {
                        
                        switch(err.errors[errName].type) 
                        {
                            case ValidationErrors.REQUIRED:
                                errMessage = ('Field is required');
                            break;
                            case ValidationErrors.NOTVALID:
                                errMessage = ('Field is not valid');
                            break;
                        }
                    }
                res.send(errMessage);
            }
            else
                {
                    res.render('process_get', { 'first_name':req.body.first_name,'last_name':req.body.last_name,'email':req.body.email, 'file_name':file_name });
                    console.log("User Saved Successfully");
                }
        });   
        
   
	}
    else
        {
          return next(new Error("Hey, first would you select a file?"));
        }
});

module.exports = router;