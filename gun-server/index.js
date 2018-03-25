const axios = require('axios'),
uuid = require('uuid'),
moment = require('moment'),
SerialPort = require("serialport"),
serialport = new SerialPort("COM5"),
gun_id = uuid(),
common_locations = [
  {'latitude': 57, 'longitude': 9},
  {'latitude': 42, 'longitude': 73},
  {'latitude': 33, 'longitude': 45},
  {'latitude': 31, 'longitude': 106},
  {'latitude': 40, 'longitude': 79},
];

function getLatLong() {
  return common_locations[Math.floor(Math.random() * 5)]
}

function getShot() {
  var data = getLatLong();
  data['time'] = moment().format();
  return data;
}

function sendTriggerToGun(status) {
  serialport.write(status + "", function(err) { if (err) console.log('Error on write: ', err.message) });
}

// to get actual location
function grabDataPromise() {
  return getLocationPromise()
  .then(data => {
    data.id = gun_id;
    return data;
  })
}

function getLocationPromise() {
  return axios.get("http://ipinfo.io/json")
  .then(response => {
    return { "location": response.data.loc };
  })
}

function onShotFired() {
  axios.get(`http://localhost:4000/id/${gun_id}`)
  .then(canShoot => {
    if (canShoot.data) {
      axios.post('http://localhost:4000/shot', {id: gun_id, shot: getShot()})
      .then(response => {
      })
      .catch(error => {
        console.log(error);
      });
      sendTriggerToGun(1);
    } else {
      sendTriggerToGun(0);
    }
  })
  .catch(error => {
    console.log(error);
  });
}

serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
    onShotFired();
  });
});
