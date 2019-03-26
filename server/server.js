const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected');
    socket.on('disconnect', () => {
        console.log('user was disconnected');
    });

    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        })
    })

    // socket.emit('newMessage', {
    //     from: 'bla',
    //     text: 'blabla',
    //     createdAt: 123
    // });
})



server.listen(port, () => {
    console.log('listening at port ', port)
})