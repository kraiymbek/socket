let socket = io();

socket.on('connect',()=>{
    console.log('Connected to the server');
    // socket.emit('newEmail',{
    //     from: 'ray@mail.ru',
    //     text: 'hey, i have a new car!'
    // });

});

socket.on('disconnect',()=>{
    console.log('Disconnected from the server!');
});


// socket.on('createdEmail', function (email) {
//     console.log('Email from server', email);
// });

socket.on('newMessage', function (message) {
   console.log('New message',message);
});

socket.emit('createMessage',{
    from: 'Raiym@mail.ru',
    text: 'Auildamyn goi'
});



