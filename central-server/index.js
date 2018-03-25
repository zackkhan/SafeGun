var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var request = require('request')
var gun_list = {}
var path = require('path')
var g_api_key = "AIzaSyAlCfacCR71MjuL3VPirz-dMnU0QktlV7E"

function event_object(id, long, lat){
    this.id = id;
    this.location = {};
    this.shots = []
    this.location.latitude = lat;
    this.location.longitude = long;
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

var http = require('http').Server(app)
var io = require('socket.io')(http);

io.on('connection', function(socket){
    console.log('connected');
});

function toggleGun(id, status) {
    gun_list[id].canShoot = status;
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/shot', function(req, res){
    if (gun_list[req.body.id] == null) {
        gun_list[req.body.id] = {"shots": [], canShoot: true, nearbySchool: false}
        console.log("not found")
    }
    //radius is within meters
    var radius = 2000;
    var keyword = "school"
    gun_list[req.body.id].shots.push(req.body.shot)
    
    var url =  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + 
    req.body.shot.longitude+","+ req.body.shot.latitude + "&radius=" + radius + "&type=" + keyword  + "&key="+ g_api_key;
    request.get(url, function(error, response, body){
        
        console.log(body)
        var places = JSON.parse(body)
        var place_list = []
        for (var i = 0; i < places.results.length; i++) {
            place_list.push(places.results[i].name)
        }
        // if near school, nearbySchool = true
        if (place_list.length >= 1){
            gun_list[req.body.shot.id].nearbySchool = true;
        }
        console.log(place_list)
    });
    io.emit('update', gun_list); // emit an event to all connected sockets
    res.sendStatus(200);
});

app.get('/video', function(req, res) {
});

app.get('/id/:gunID', function(req, res) {
    res.send(gun_list[req.params.gunID].canShoot)
});

app.post('/video', function(req, res) {
});

http.listen(4000, function() {
    console.log('Example app listening on port 4000!')
});
