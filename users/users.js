

var mongoose = require('mongoose'),
Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/users');

var userSchema = new Schema({ 
    
    id: Number,
    name: String,
    password: String,
    displayName: String

});

var userRecord = mongoose.model('userrecord', userSchema),
userInfo = mongoose.model('userinfo',new Schema({

    infoID: String, 
    userCount: Number

}));

// find a user document by the given id
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

// find a user document by the given username
exports.findByUsername = function(username, cb){

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

// create a new user with the given form JSON
exports.createUser = function(formJSON){

    var newUser = new userRecord(JSON.parse(formJSON));

    console.log('checking if username is taken...');
    
    userRecord.findOne({'name': newUser.name},'', function(err,user){
  
        if(user){

            console.log('someone tryed to setup an account for a username that is taken');

        }else{

            console.log('NEW USER!');

            // find current user count
            userInfo.findOne({'infoID': 'main'},'', function(err,info){


                // we should have info
                if(info){

                   console.log('yes we have main user info:');
                   console.log(info);

                   // save new user?
                   console.log('setting user id...');
                   newUser.id = info.userCount;
                   console.log(newUser);

                   // update user info
                   info.userCount += 1;

                   // save data??
                   newUser.save(function(){

                      console.log('new user data saved!');

                   });
                   newUser.save(function(){

                      console.log('user info updated!');

                   });

                // we have a problem, or we are starting over with a new database.
                }else{
              
                    var newInfo = new userInfo({infoID: 'main', userCount: 1});
                    
                    newInfo.save(function(){

                        console.log('saved new main user info record!');

                    });

                }

            });

        }
  
    });  
    
};