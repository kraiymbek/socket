const path = require('path');
const express = require('express');
const socketIO = require('socket.io');
const http = require('http');

const publicPath = path.join(__dirname ,'../public');
let port = process.env.PORT || 3000;
let app = express();

let server = http.createServer(app);
let io = socketIO(server);

io.on('connection',(socket)=>{
    console.log('Connected new user');


    socket.emit('newMessage',{
        from: 'Admin',
        text: 'Welcome to our chat app',
        completedAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from: 'Admin',
        text: 'new user was joined',
        completedAt: new Date().getTime()
    });


    socket.on('createMessage', (message)=> {
        console.log('Create message', message);

        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

        // socket.broadcast.emit('newMessage',{
        //     from:  message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });

    });


    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    });
});



app.use(express.static(publicPath));



server.listen(port,()=>{
    console.log(`Started on port ${port} `);
});