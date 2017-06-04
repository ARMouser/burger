var express = require('express');
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./models')

var app = express();
var port = process.env.PORT || 4000;

app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static('./public'));

// app.use('/')
require('./routes/html-routes.js')(app);
require('./routes/api-routes.js')(app);

db.sequelize.sync().then(function() {
    app.listen(port);
})

