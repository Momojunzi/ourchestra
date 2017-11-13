
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(bodyParser.text());

app.use(session({secret:'John Henry', resave:true, saveUninitializes: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static('public'));

require('./routes/auth.js')(app,passport);
require('./config/passport/passport.js')(passport, db.User);

require("./routes/apiRoutes.js")(app);
require("./routes/htmlRoutes.js")(app);

db.sequelize.sync({force:true}).then(function(){
  app.listen(PORT, function(){
    console.log("Ourchestra listening on PORT " + PORT);
  });
});
