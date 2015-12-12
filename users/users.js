

var mongoose = require('mongoose'),
Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/users');

var userSchema = new Schema({ 
    
    id: Number,
    name: String,
    password: String,
    displayName: String

});

var userRecord = mongoose.model('userrecord', userSchema);


exports.findById = function(id,cb){

    console.log('finding by id...');

    userRecord.findOne({'id': id},'', function(err,user){
    
        if(user){
        
            console.log('found user with given id!');

            return cb(null, user);

        }else{

            console.log('no user found with given id');

            return cb(null,null);

        }

    });

};

exports.findByUsername = function(username, cb){

    //console.log('okay good we made it this far.');

/*
    userdata.findOne({ 'name': username }, 'name', function (err, user) {
         if (err) return handleError(err);

         console.log(user);

         //console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
     })
*/

    userRecord.findOne({'name': username},'', function(err,user){

         if(user){

             console.log('username found');

             return cb(null, user);

         }else{

            console.log('given user name not found!');

             return cb(null,null);

         }

    });

};

/*
var records = [
    { id: 1, username: 'jack', password: '123', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] }
  , { id: 2, username: 'jill', password: 'password', displayName: 'Jill', emails: [ { value: 'jill@example.com' } ] }
];

exports.findById = function(id, cb) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      cb(null, records[idx]);
    } else {
      cb(new Error('User ' + id + ' does not exist'));
    }
  });
}

exports.findByUsername = function(username, cb) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {

        console.log(username + ' found!');

        return cb(null, record);
      }
    }
    return cb(null, null);
  });
}
*/