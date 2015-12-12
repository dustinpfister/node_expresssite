/*

playing with mongoose.

this script should make a mongoDB database called "users", and add a single document to a collection called "userrecords"

after running the script you should be able to access the document in the terminal like so

$ mongo

> use users
> db.userrecods.find({'name':'dustin'})

*/

var mongoose = require('mongoose'),
Schema = mongoose.Schema,
userdata;

mongoose.connect('mongodb://localhost/users');

var userSchema = new Schema({ 
    
    id: Number,
    name: String,
    password: String,
    displayName: String

});

var userRecord = mongoose.model('userrecord', userSchema);

var jack = new userRecord({
    
    id : 3,
    name : 'dustin',
    password: 'jsguy',
    displayName: 'Stintose!'

});

jack.save(function(){

   console.log('record saved?');

});

console.log(jack);