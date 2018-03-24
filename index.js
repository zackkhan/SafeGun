var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var exphbs = require('express-handlebars')
var request = require('request')
var gun_list = {}

function gun_object(id, long, lat){
    this.id = id;
    this.location = {};
    this.shots = []
    this.location.latitude = lat;
    this.location.longitude = long;
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/public', express.static('public'))
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function(req, res) {
    res.render('home',{});
    console.log("home");
});

app.get('/video', function(req, res) {
    res.render('home',{});
});

app.post('/video', function(req, res) {
    var x = req.body.path;
    console.log(x)
});

http.listen(3000, function() {
    console.log('Example app listening on port 3000!')
});
