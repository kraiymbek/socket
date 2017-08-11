const expect = require('expect');
const {generateMessage,generateLocationMessage} = require('./message');


describe('testing generate message',()=>{
    it('should generate correct message object',()=>{
        let from = 'Raiym';
        let text = 'Hey there, this is text test!';

        let res = generateMessage(from,text);

        expect(res.completedAt).toBeA('number');
        expect(res).toInclude({from,text});
    });
});

describe('testing generateLocationMessage',()=>{
    it('should generate correct location message object',()=>{
        let from = 'Admin';
        let lat = 15;
        let lng = 19;
        let url = 'https:/www.google.com/maps?q=15,19';
        let message = generateLocationMessage(from,lat,lng);
        expect(message.completedAt).toBeA('number');
        expect(message).toInclude({from,url});
    });
});