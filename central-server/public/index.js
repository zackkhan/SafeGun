/*const socket = io('http://localhost:4000');*/
/*@ZACK ^ This is raising an error*/
var gun_list = {}
var map;
//keeps track of most recent gun shot
var id;
var k;

$('#button').click(function() {
    console.log("Pressed");

});

function initMap() {
        // Styles a map in night mode.
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 38.0336, lng: -78.5080},
          zoom: 12,
          styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
        });
      }


socket.on('connect', function () {

});
socket.on('update', function (data) {
    gun_list = data;
    for (key in gun_list)
        id = key
    console.log(gun_list[id].shots)
    for (key in gun_list[id].shots)
        k = key
    console.log(gun_list[id].shots[k].latitude)
    var latLng = new google.maps.LatLng(gun_list[id].shots[k].latitude, gun_list[id].shots[k].longitude);
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
});

$('#button').click(function() {
    console.log("Pressed");
});



$('#safetrek').on('click', function(e) {
  const CALLBACK_URL =  '/callback'
  const SAFETREK_API_URL =  'https://api-sandbox.safetrek.io/v1'
  const DEFAULT_ACCURACY =  5
  const RANDOM_ADDRESS_DATA = '/address-us-100.min.json'

  const ls = localStorage
  const log = console.log
  const logErr = console.error
  const logWarn = console.warn

  var a_data = {}
  a_data.services = {}
  a_data.services.police = true;
  a_data.services.fire = false;
  a_data.services.medical = false;

  a_data["location.coordinates"] = {}
  a_data["location.coordinates"].lat = gun_list[id].shots[k].latitude;
  a_data["location.coordinates"].lng = gun_list[id].shots[k].longitude;
  a_data["location.coordinates"].accuracy= 5;

    e.preventDefault()
        let url = SAFETREK_API_URL + '/alarms'
        $.ajax({
          url: url,
          type: 'post',
          headers: {
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5FWTBPVVV3TVRSRU5qUTRSVUZDTkVJd01rUTBSVEUwUVRJMFF6ZzRSVGc1T0RBMFJEWXhOUSJ9.eyJodHRwOi8vY2xpZW50LW5hbWUiOiJIQUNLX1VWQSIsImlzcyI6Imh0dHBzOi8vbG9naW4tc2FuZGJveC5zYWZldHJlay5pby8iLCJzdWIiOiJzbXN8NWFiNzNmZjhhNjgwM2E5MTkxMWU3ZTk3IiwiYXVkIjpbImh0dHBzOi8vYXBpLXNhbmRib3guc2FmZXRyZWsuaW8iLCJodHRwczovL3NhZmV0cmVrLXNhbmRib3guYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTUyMTk2MDUzMSwiZXhwIjoxNTIxOTk2NTMxLCJhenAiOiJtNXFYRjV6dE9kVDRjZFF0VWJaVDJnckJoRjE4N3Z3NiIsInNjb3BlIjoib3BlbmlkIHBob25lIG9mZmxpbmVfYWNjZXNzIn0.dSwNMz4r3DOM2ylb3Mn_czFy3pusMSaiMULF-dl1HjRZs1XD7_2YU1loJJZkuj1oOyqcIIt5s2P681Oly6RccMsWxPXmCWeJFpeP7F377mK-qCSHPATVotSFep0Igveo14_SdltbGCeDHRGoJYeE16fbiEz67yfpYHDZAsprLld0H4SSj5sqbggxkvyV_Ht_uC7Za-J3ohjbzhxYu8Y3Sm5x-28nE2LXJ7CkiBaji2TmlZ_aSP6WoZ2EfpMgC9Hjl89XN85TP3gPc0amh20f1suWXigQNuTVIKhDAkwbIKnyo7hbP51sWxosN583x54cVa2S-qs8_OUvts8z9MZDUA`
          },
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify(a_data),
          success: (data) => {
            log('Alarm created successfully! Server response:\n', JSON.stringify(data, null, 2), '\nAlarm status will reset in 10s.')
          },
          error: (xhr, status, err) => { logErr('Error:', err)
        console.log(status) },
          complete: () => {
            console.log("Alarm is active")
          }
        })
});
