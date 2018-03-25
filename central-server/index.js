var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var request = require('request')
var gun_list = {}
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

var http = require('http').Server(app)

function toggleGun(id, status) {
    gun_list[id].canShoot = status;
}

app.get('/', function(req, res) {
    res.render('home',{});
    console.log("home");
});

app.post('/shot', function(req, res){
    if (gun_list[req.body.id] == null) {
        gun_list[req.body.id] = {"shots": [], canShoot: true, nearbySchool: false}
        console.log("not found")
    }
    var radius = 1000;
    var keyword = "school"
    gun_list[req.body.id].shots.push(req.body.shot)
    
    //radius is within meters
    var url =  "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + 
    req.body.shot.longitude+","+ req.body.shot.latitude + "&radius=" + radius + "&key="+ g_api_key;
    request.get(url, function(data){
        var place_list = []
        var places = JSON.parse(body)
        for (var i = 0; i < places.results.length; i++) {
            place_list.push(places.results[i].name)
        }
        console.log(place_list)
        // if near school, nearbySchool = true
    });
    res.sendStatus(200);
});

app.get('/video', function(req, res) {
    res.render('home',{});
});

app.get('/id/:gunID', function(req, res) {
    res.send(gun_list[req.params.gunID].canShoot)
});

app.post('/video', function(req, res) {
});

http.listen(4000, function() {
    console.log('Example app listening on port 4000!')
});
