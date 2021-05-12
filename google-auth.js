const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;


// take id from the user if found id then call done
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  // user cookie
  passport.deserializeUser(function(user, done) {
      done(null, user);
  });

// use passport function for google OAuth
passport.use(new GoogleStrategy({
    clientID: '518005766882-9l56gomv10tds6v9ju5h1b0pm76ici3d.apps.googleusercontent.com',
    clientSecret: 'Zui7u4mmtS_fEfRR_aevvVFe',
    
    // callbackUrl use for redirect after google login
    callbackURL: "http://localhost:5000/auth/google/callback"
  },

  function(accessToken, refreshToken, profile, done) {

    // checking profile is registered or not 
  
      return done(null, profile);
   
  }
));