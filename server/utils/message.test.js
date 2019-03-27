const expect = require('expect');
var { generateMessage } = require('./message');

describe('generate message', () => {
    it('should generate correct message object', () => {
        var from = 'vishal';
        var text = 'do something';
        var message = generateMessage(from, text);
        expect(message).toInclude({from,text});
        expect(res.createdAt).toBeA(Number);
    });
});