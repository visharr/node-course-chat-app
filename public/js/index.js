var socket = io();
socket.on('connect', function () {
    console.log('connected to server');
    // socket.emit('createMessage', {
    //     from: 'Andrew',
    //     text: 'that works for me'
    // })

});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
    var template = jQuery('#message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);

    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // li.text(`${message.from} ${formattedTime}:${message.text}`);
    // jQuery('#messages').append(li);
})

socket.on('newLocationMessage', function (message) {

    var template = jQuery('#location-message-template').html();
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);

    // var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My Current Location</a>')
    // li.text(`${message.from}: ${formattedTime}`);
    // a.attr('href', message.url)
    // li.append(a);
    // jQuery('#messages').append(li);
})

// socket.emit('createMessage', {
//     from: 'vishal',
//     text: 'hi'
// }, function (data) {
//     console.log('got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'vishal',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    });

});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Send Location');;
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Send Location');
        alert('unable to fetch location');
    });
});