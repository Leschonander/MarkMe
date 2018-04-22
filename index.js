var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://MYSELF:6lkp7DfBIKpoj57q@markmedatabase-4yie0.mongodb.net/test');
var uri = "mongodb+srv://MYSELF:6lkp7DfBIKpoj57q@markmedatabase-4yie0.mongodb.net/test";
MongoClient.connect(uri, function(err, client) {
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});

var personSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    lastSeen: String,
    notes: String
});

var Person = mongoose.model("Person", personSchema);

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.render("Home");
});

app.get('/missing', function(req, res){
    Person.find({}, function(err, allPersonsLost){
        if(err){
            console.log("Database Error");
            console.log(err);
        } else {
            console.log("Sucess")
            res.render("Missing", {personsLost: allPersonsLost});
        }
    });
});

app.get('/missing/new', function(req, res){
    res.render('Newmissing')
})

app.post('/missing/new', function(req, res){
    var newFMissing = req.body.newmissingfname
    var NewLMissing = req.body.newmissinglname
    var datelastsighted = req.body.datesighted
    var information = req.body.tips
    var newPersonLost = {
      firstName: newFMissing , 
      lastName: NewLMissing , 
      lastSeen: datelastsighted , 
      notes: information 
    };
    Person.create(newPersonLost, function(err,newPerson){
        if(err){
            console.log("Failure in creation.")
            console.log(err);
        } else {
            res.redirect('/missing');
            console.log(newPerson); 
        }
    });
});
app.listen(3000, function(){
    console.log("Server is up!"); 
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Mongoose is up!")
});
