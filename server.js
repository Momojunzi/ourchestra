
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(bodyParser.text());

app.use(express.static('public'));

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

db.sequelize.sync({force:true}).then(function(){
  app.listen(PORT, function(){
    console.log("Ourchestra listening on PORT " + PORT);
  });
});
