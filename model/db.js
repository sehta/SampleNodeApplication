//Lets load the mongoose module in our program
var mongoose = require('mongoose');  
var userSchema = new mongoose.Schema({  
  firstname:{type:String, required: [true, 'Required First Name!']}, lastname: {type:String, required: [true, 'Required Last Name!']}, email: {type:String, required: [true, 'Required Email!']},logo:String,password:{type:String, required: [true, 'Required Password!']}
});
mongoose.model('User', userSchema);  
mongoose.connect('mongodb://localhost/umesh');
module.exports.userSchema =userSchema;