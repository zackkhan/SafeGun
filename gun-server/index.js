const axios = require('axios'),
uuid = require('uuid'),
SerialPort = require("serialport"),
serialport = new SerialPort("COM5"),
gun_id = uuid();

function getLatLong(loc_str) {
  console.log(loc_str);
  return {"latitude": 127, "longitude": 30};
}

function grabDataPromise() {
  return getLocationPromise()
  .then(data => {
    data.id = gun_id;
    return data;
  })
}

function sendTriggerToGun(status) {
  serialport.write(status + "", function(err) { if (err) console.log('Error on write: ', err.message) });
}

function getLocationPromise() {
  return axios.get("http://ipinfo.io/json")
  .then(response => {
    return { "location": response.data.loc };
  })
}

function onShotFired() {
  grabDataPromise()
  .then(obj => {
    console.log(obj)
    axios.post('http://localhost:4000/shot', {id: gun_id, shot: {'longitude': 127, 'latitude': 30}})
    .then(response => {
      //console.log(response);
      axios.get(`http://localhost:4000/id/${gun_id}`)
      .then(canShoot => {
        if (canShoot.data) {
          sendTriggerToGun(1);
        } else {
          sendTriggerToGun(0);
        }
      })
      .catch(error => {
        console.log(error);
      });
    })
    .catch(error => {
      console.log(error);
    });
  })
}

serialport.on('open', function(){
  console.log('Serial Port Opend');
  serialport.on('data', function(data){
    onShotFired();
  });
});
