const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./google-auth');

const port = 5000
app.use(cors());
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'cookie-session',
    keys: ['key1', 'key2']
  }))


  // check user isLoggedIn or not
const isLoggedIn = (req, res, next) => {
    if(req.user){
        next();
    }
    else{
        res.sendStatus(404);
    }
}

// initialize passport 
app.use(passport.initialize());
app.use(passport.session());

// when user enter home or /  route show logged in
app.get('/', (req, res) => {
    res.send('Please Logged In')
})

// when user successfully logged in show this route with user name
app.get('/success', isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.displayName}`)
})


// if user don't logged in successfully
app.get('/fail', (req, res) => {
    res.send('Login failed')
})


// google auth route
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));


 // callback api
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // After Successful authentication, redirect home.
        res.redirect('/success');
    });

    // when user wants to logout
app.get('/logout', (req, res) =>{
    req.session = null;
    req.logOut();
    res.redirect('/')

})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})