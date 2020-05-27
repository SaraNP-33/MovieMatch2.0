// import passport packages required for authentication
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

// models folder to check passport against
var db = require("../models");

// tell passport we want to use a Local Strategy
// we want login with a username/email and password
passport.use(new LocalStrategy(
  // user will sign in using an email, rather than a "username"
  {
    usernameField: "email"
  },
  function(email, password, done) {
    // when user tries to sign in this code runs
    db.User.findOne({
      where: {
        email: email
      }
    }).then(function(dbUser) {
      // if there's no user with the given email
      if (!dbUser) {
        return done(null, false, {
          message: "Incorrect email"
        });
      }
      // if there is a user with the given email, but the password the user gives us is incorrect
      else if (!dbUser.validPassword(password)) {
        return done(null, false, {
          message: "Incorrect password"
        });
      }
      // if none of the above, return the user
      return done(null, dbUser);
    });
  }
));

// to help keep authentication state across HTTP requests,
// sequelize needs to serialize and deserialize the user
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

// export configured passport
module.exports = passport;