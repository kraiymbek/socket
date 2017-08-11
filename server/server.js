const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const {generateMessage,generateLocationMessage} = require('./utils/message');

const publicPath = path.join(__dirname ,'../public');
let port = process.env.PORT || 3000;
let app = express();

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('Connected new user');


    socket.emit('newMessage',generateMessage('Admin','Welcome to our web chat'));

    socket.broadcast.emit('newMessage',generateMessage('Admin','New user was joined'));


    socket.on('createMessage', (message,callback)=> {
        console.log('Create message', message);
        callback('This is from server');

        io.emit('newMessage', generateMessage(message.from,message.text));


    });

    socket.on('createLocationMessage',(message) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', message.latitude, message.longitude));
    });


    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    });
});



app.use(express.static(publicPath));



server.listen(port,()=>{
    console.log(`Started on port ${port} `);
});