const expect = require('expect');
const {generateMessage} = require('./message');


describe('testing generate message',()=>{
    it('should generate correct message object',()=>{
        let from = 'Raiym';
        let text = 'Hey there, this is text test!';

        let res = generateMessage(from,text);

        expect(res.completedAt).toBeA('number');
        expect(res).toInclude({from,text});
    });
});