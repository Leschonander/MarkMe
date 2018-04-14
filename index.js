var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var personsLost = [
    {firstName: "Mark" , lastName: "Dombroski" , lastSeen: "01/01/2018", notes: "In Memoriam"  },
    {firstName: "Joachim" , lastName: "Smith" , lastSeen: "01/01/2018", notes: "Testing A" },
    {firstName: "John" , lastName: "Smith" , lastSeen: "01/01/2018", notes: "Testing B" }
];

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.render("Home");
});

app.get('/missing', function(req, res){
    res.render("Missing", {personsLost: personsLost});
});

app.post('/newmissing', function(req, res){
    var newFMissing = req.body.newmissingfname
    var NewLMissing = req.body.newmissinglname
    var datelastsighted = JSON.stringify(req.body.datesighted)
    var information = req.body.tips
    personsLost.push({
        firstName: req.body.newmissingfname , 
        lastName: req.body.newmissinglname , 
        lastSeen: req.body.datelastsighted ,
        notes: req.body.tips
    });
    console.log(personsLost); 
    res.redirect('/missing');
});

app.listen(3000, function(){
    console.log("Server is up!"); 
});

/*
[ { firstName: 'Mark', lastName: 'Dombroski' },
  { firstName: 'Joachim', lastName: 'Smith' },
  { firstName: 'John', lastName: 'Smith' },
  'WillMckay' ]
*/