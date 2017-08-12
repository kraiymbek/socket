

$(document).ready(function () {


function scrollToButtom() {

    let messages = $('#messages');
    let newMessage = messages.children('li:last-child');

    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    let sum = clientHeight + scrollHeight + newMessageHeight + lastMessageHeight;

    if(sum => clientHeight) messages.scrollTop(scrollHeight);

    console.log(`Client heigh: ${clientHeight}, scrollTop: ${scrollTop}, scrollHeigh: ${scrollHeight}
                newMessageHEigh: ${newMessageHeight}, lastMessage: ${lastMessageHeight}, sum :${sum}`);
    
}
    
    
let socket = io();

socket.on('connect',()=>{
    console.log('Connected to the server');

});

socket.on('disconnect',()=>{
    console.log('Disconnected from the server!');
});



socket.on('newMessage', function (message) {
   console.log('New message',message);

        let formattedTime = moment(message.completedAt).format('h:mm a');
        let template = $('#message-template').html();
        let html = Mustache.render(template,{
            from: message.from,
            text: message.text,
            completedAt: formattedTime
        });

        $('#messages').append(html);
        scrollToButtom()


});

socket.on('newLocationMessage', function (message) {
   console.log('New location message',message);

   let formattedTime = moment(message.completedAt).format('h:mm a');

   let template = $('#location-message-template').html();
   let html = Mustache.render(template,{
       from: message.from,
       url: message.url,
       completedAt: formattedTime
   });


   $('#messages').append(html);
    scrollToButtom()

});


$('#message-form').on('submit',(e)=>{

    e.preventDefault();

    let messageTextBox = $('[name=message]');

    socket.emit('createMessage',{
        from:'User',
        text: messageTextBox.val()
    },function () {
        messageTextBox.val('');
    });
});

let getPosition = $('#send-location');

getPosition.on('click',()=>{
    if(!navigator.geolocation){
        return alert('There is no geolocation');
    }

    getPosition.attr('disabled','disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition((position)=>{
        getPosition.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });


    },()=>{
        getPosition.removeAttr('disabled').text('Send location');
        alert('Unable to fetch position');
    })

});



});






