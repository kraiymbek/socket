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

    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    });
});



app.use(express.static(publicPath));



server.listen(port,()=>{
    console.log(`Started on port ${port} `);
});