var mongoose = require('mongoose'),
Schema = mongoose.Schema,
userdata;

mongoose.connect('mongodb://localhost/users');

userSchema = new Schema({ 
    
    id: Number,
    name: String,
    password: String,
    displayName: String

});

var userRecord = mongoose.model('userrecord', userSchema);

userRecord.findOne({'name':'stintose'}, '', function(a,b){

   console.log(a);
console.log(b);

});