//Start node and install express it will get you started on the application

/* Code taken from college lecture week 11*/

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

//Set view engine
app.set("view engine", "ejs");

//Import authentication module
const auth = require('./auth.js');

auth.createUser("user", "pass");

console.log(auth.authenticateUser("user", "pass"));


//Connect to database:
const mysql = require('mysql');
//Create a connection to the MySQL database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'g00411266'
});

//Connect to the database
connection.connect((err) => {
    if(err) {
        console.error('Error connecting to database: ', err);
    } else {
        console.log('Connected to database!');
    }
});

//Server static files from the public directory
app.use(express.static("home"));

app.get("/views", function(req, res){
    res.render("shop.html");
})

app.get("/pages", function(req, res){
    res.render("checkout.html");

})

//route to handle the login form submission
app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const authenticated = auth.authenticateUser(username, password);
    console.log(authenticated);

    if(authenticated) 
    {
        console.log("Authentication was successful")
        res.render("home");
    } else {
        console.log("Authentication was not successful")
        res.render("failed");
    }
});

//Get information from the database
app.get("/shop", function(req, res){
    const ID = req.query.rec;
    connection.query("SELECT * FROM g00411266 WHERE ID = ?", [ID], function(err, rows, fields) 
    {
      if(err)
      {
        console.error("Error retrieving data from database:", err);
        res.status(500).send("Error retrieving data from the database");
      }
      else if(rows.length === 0)
      {
        console.error("No rows found for ID $[ID]");
      }
      else
      {
        console.log("Data retrieved from the Database!");
        console.log(rows[0].Products);
        console.log(rows[0].Manufacturer);
        console.log(rows[0].Quantity);
        console.log(rows[0].Price);
        console.log(rows[0].Image);
        const prodName = rows[0].Products;
        const prodMan = rows[0].Manufacturer;
        const image = rows[0].Image;
        const price = rows[0].Price
        res.render("test.ejs", {myMessage: prodName, model: prodMan, myImage: image, myPrice: price});


      }
      //Inject data into a HTML

    }
    
    )
    
   
});

//Post Method
app.post("/shop", function(req, res){
    const ID = req.query.rec2;
  connection.query("SELECT * FROM g00411266 WHERE ID = ?", [ID], function(err, rows, fields)
  {
    if(err)
    {
        console.error("Error retrieving data from data:", err);
        res.status(500).send("Error retrieving data from database");
    }
    else if(rows.length === 0)
    {
        console.error("No rows found for ID $[ID]");
    }
    else 
    {
        console.log("Data retrieved from the Database!");
        console.log(rows[0].Products);
        console.log(rows[0].Manufacturer);
        console.log(rows[0].Quantity);
        console.log(rows[0].Price/unit);
        const prodName = rows[0].Products;
        const prodMan = rows[0].Manufacturer;
        res.render("test.ejs", {myMessage: Products, model: Manufacturer});
    }
    //Inject data into a HTML
  
  }
  
  ) 


});


//Start the server
app.use(express.static("pages", {index: "index.html"}));
app.listen(3000, () => {
    console.log('Server started on port 3000')
});