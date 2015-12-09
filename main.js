
var express = require('express'),
app = express(),
passport = require('passport'),
Strategy = require('passport-local').Strategy,
users = require('./users/users.js'),
server,

siteWide = express.Router();

// use passport local strategy
// followinf example at : https://github.com/passport/express-4.x-local-example/blob/master/server.js

passport.use(new Strategy(
  function(username, password, cb) {
    users.findByUsername(username, function(err, user) {

      console.log('yes finding user...');

      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());


// site wide GET request
siteWide.get('*',function(req,res,next){


    // if visiter is not logged in redirrect to login page
    if(req.user === undefined){

        console.log('visiter is not logged in');

        // if not at login page go there        
        if(req.url !== '/login.html'){

           res.redirect('/login.html');

        // else static serve
        }else{

            next();
        }

    // else if the visitor is logged in...
    }else{

        // stupid thing where i check headers for something to do something differant
        if(req.get('super-get') === 'picture'){

            console.log('supper-get');
            res.send('here is your picture');

        }else{

            console.log('serving static get');
            next();

        }

    }

});


app.post('/login.html', 
  passport.authenticate('local', { failureRedirect: '/login.html' }),
  function(req, res) {
    res.redirect('/');
});


app.use(
    siteWide,
    express.static('public_html')
);




server = app.listen(3000, function () {
  var host = server.address().address,
  port = server.address().port;

  console.log('it lives.');
  console.log('Example app listening at http://%s:%s', host, port);
});
