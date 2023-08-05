const express = require('express');//requiring the express module
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');


const connectDB = require('./server/database/connection');

const app = express();//creating the app

dotenv.config( { path : 'config.env'} )//Mentioning the path of config file
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))

// set view engine
app.set("view engine", "ejs")


// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//load routers
app.use('/', require('./server/routes/router'));

//app.set("views", path.join(__dirname, "views"));
const User = require('./server/model/user');



//--------------------LOGIN---------------------------

// Route for displaying the login form

app.get('/login', (req, res) => {
    res.render('login', { error: null }); // Pass the error variable as an object
  });
  

  // Route for handling user login

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.render('login', { error: 'User not found' });
    }

    // Compare passwords (You need to implement this method in your User model)
    if (user.comparePassword(password)) {
      // Successful login
      // Here, you can redirect the user to the dashboard or any other protected route
      return res.redirect('/');
    } else {
      return res.render('login', { error: 'Invalid password' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal Server Error');
  }
});
 
//----------------------------------------------------


app.get('/index', (req, res) => {
  // Here, you can add any logic or authentication checks before rendering the index page
  res.render('index'); // Assuming your index.ejs file is in the "views" folder
});



  
app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});