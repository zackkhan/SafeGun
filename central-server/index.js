var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var request = require('request')
var gun_list = {'0':
    { 
        shots: [ { latitude: 33,
            longitude: 45,
            time: '2018-03-25T09:49:54-04:00' },
          { latitude: 42,
            longitude: 73,
            time: '2018-03-25T09:50:03-04:00' },
          { latitude: 42,
            longitude: 73,
            time: '2018-03-25T09:50:09-04:00' } ],
        canShoot: true,
        nearbySchool: true 
    }
};
var path = require('path')
var g_api_key = "AIzaSyAlCfacCR71MjuL3VPirz-dMnU0QktlV7E"
var canShoot = true;

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
    socket.on('status', function(data) {
        if (data == 1) {
            toggleGun(true);
            canShoot = true;
        } else {
            toggleGun(false);
            canShoot = false;
        }
    });
    socket.emit('updateFull', gun_list);
});

function toggleGun(status) {
    for (key in gun_list) {
        gun_list[key].canShoot = status;
    }
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/shot', function(req, res){
    if (gun_list[req.body.id] == null) {
        gun_list[req.body.id] = {"shots": [], canShoot: true, nearbySchool: true}
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
            gun_list[req.body.id].nearbySchool = true;
        }
        console.log(place_list)
    });
    console.log(gun_list)
    io.emit('update', gun_list); // emit an event to all connected sockets
    res.sendStatus(200);
    console.log(gun_list[req.body.id].shots);
});

app.get('/id/:gunID', function(req, res) {
    //res.send(gun_list[req.params.gunID].canShoot)
    res.send(canShoot)
});

http.listen(4000, function() {
    console.log('Example app listening on port 4000!')
});
