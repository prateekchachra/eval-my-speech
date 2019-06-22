const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('passport');
const path = require('path');


const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
// DB Config.

const db = require('./config/keys').mongoURI;



const app = express();
// Connect to MongoDB
app.use(passport.initialize());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, DELETE");
    next();
});
//Passport config

require('./config/passport.js')(passport);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(db).
    then(()=> console.log('Connected successfully'))
    .catch((error) => console.log(error));

//Use routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

// Server static assets if in production

if(process.env.NODE_ENV === 'production'){
    //Set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')); 

    });


}   
const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server running on port ${port}`));