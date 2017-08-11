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

    // socket.on('newEmail',(email)=>{
    //     console.log('New email:',email);
    // });
    //
    // socket.emit('createdEmail',{
    //     from: 'Alex@mail.ru',
    //     text: 'email from server',
    //     createdAt: 123
    // });

    socket.emit('newMessage',{
        from: 'Anar@mail.kz',
        text: 'Where are you lose?',
        createdAt: 123
    });

    socket.on('createMessage', (email)=> {
        console.log('New message to server',email);
    });


    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    });
});



app.use(express.static(publicPath));



server.listen(port,()=>{
    console.log(`Started on port ${port} `);
});