let socket = io();

socket.on('connect',()=>{
    console.log('Connected to the server');

});

socket.on('disconnect',()=>{
    console.log('Disconnected from the server!');
});



socket.on('newMessage', function (message) {
   console.log('New message',message);
});





