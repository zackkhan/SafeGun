var map; 
$('#button').click(function() {
    console.log("Pressed");
    
});
function initMap() {
// pulling up all gun shots of a user with a given ID 
map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: new google.maps.LatLng(38.986918,-76.942554),
    mapTypeId: 'terrain'
  });

    $('#id_search').keypress(function(e) {
    if(e.which == 13) {
        var search = $('#id_search').val()
        var url = '/id/' + search
        $.ajax({
            type: 'GET',
            url: url,
            data: {},
            success: function(data, status) {
                console.log(data)
                for (var i = 0; i < data.length; i++) {
                    var latLng = new google.maps.LatLng(data[i].latitude,data[i].longitude);
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: map
                    });
                    }
            },
        })
    }
});

}
/*
$('a.make-alarm-request').on('click', function(e) {
    e.preventDefault()
    if (state.get('status') === 'active-alarm') {
      log('Alarm status is currently active and will reset in 10s or less.')
    } else if(state.get('status') !== 'processing') {
      if(state.get('access_token')) {
        $('.alarm').removeClass('alarm-red')
        $('.alarm-status').text('Requesting...')
        state.set('status', 'processing')
        let url = SAFETREK_API_URL + '/alarms'
        let data = $('code.alarm-request').text()
        log('Requesting Alarm creation with data:\n', data)
        $.ajax({
          url: url,
          type: 'post',
          headers: {
            'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik5FWTBPVVV3TVRSRU5qUTRSVUZDTkVJd01rUTBSVEUwUVRJMFF6ZzRSVGc1T0RBMFJEWXhOUSJ9.eyJodHRwOi8vY2xpZW50LW5hbWUiOiJIQUNLX1VWQSIsImlzcyI6Imh0dHBzOi8vbG9naW4tc2FuZGJveC5zYWZldHJlay5pby8iLCJzdWIiOiJzbXN8NWFiNzNmZjhhNjgwM2E5MTkxMWU3ZTk3IiwiYXVkIjpbImh0dHBzOi8vYXBpLXNhbmRib3guc2FmZXRyZWsuaW8iLCJodHRwczovL3NhZmV0cmVrLXNhbmRib3guYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTUyMTk2MDUzMSwiZXhwIjoxNTIxOTk2NTMxLCJhenAiOiJtNXFYRjV6dE9kVDRjZFF0VWJaVDJnckJoRjE4N3Z3NiIsInNjb3BlIjoib3BlbmlkIHBob25lIG9mZmxpbmVfYWNjZXNzIn0.dSwNMz4r3DOM2ylb3Mn_czFy3pusMSaiMULF-dl1HjRZs1XD7_2YU1loJJZkuj1oOyqcIIt5s2P681Oly6RccMsWxPXmCWeJFpeP7F377mK-qCSHPATVotSFep0Igveo14_SdltbGCeDHRGoJYeE16fbiEz67yfpYHDZAsprLld0H4SSj5sqbggxkvyV_Ht_uC7Za-J3ohjbzhxYu8Y3Sm5x-28nE2LXJ7CkiBaji2TmlZ_aSP6WoZ2EfpMgC9Hjl89XN85TP3gPc0amh20f1suWXigQNuTVIKhDAkwbIKnyo7hbP51sWxosN583x54cVa2S-qs8_OUvts8z9MZDUA`
          },
          contentType: 'application/json',
          dataType: 'json',
          data: data,
          success: (data) => {
            log('Alarm created successfully! Server response:\n', JSON.stringify(data, null, 2), '\nAlarm status will reset in 10s.')
            $('.alarm').addClass('alarm-red')
            $('.alarm-status').text('Alarm created! Check console for JSON response.')
          },
          error: (xhr, status, err) => { logErr('Error:', err) },
          complete: () => {
            state.set('status', 'active-alarm')
            setTimeout(() => {
              state.set('status', 'connected')
              $('.alarm').removeClass('alarm-red')
              $('.alarm-status').text('')
              log('Alarm status reset!')
            }, 10000)
          }
        })
      } else {
        logErr('No valid access_token found! Connect to SafeTrek before requesting Alarm creation.')
      }
    }
  })


*/
                  
