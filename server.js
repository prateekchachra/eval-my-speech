const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const passport = require('passport');

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

app.get('/', (req,res)=> {
    res.send('Hello')
});

//Use routes

app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);
const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server running on port ${port}`));