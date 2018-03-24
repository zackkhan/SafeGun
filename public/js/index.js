
var socket = io()

$('#button').click(function() {
    console.log("Pressed");
    $.ajax({
        type: 'POST',
        url: '/video',
        data: {
            path: "testString",
        },
        success: function(data, status) {
        },
    })
});

