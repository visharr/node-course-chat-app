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
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}:${message.text}`);

    jQuery('#messages').append(li);
})

// socket.emit('createMessage', {
//     from: 'vishal',
//     text: 'hi'
// }, function (data) {
//     console.log('got it', data);
// });

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'vishal',
        text: jQuery('[name=message]').val()
    }, function (data) {

    });

});