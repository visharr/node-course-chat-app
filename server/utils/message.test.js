const expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');

describe('generate message', () => {
    it('should generate correct message object', () => {
        var from = 'vishal';
        var text = 'do something';
        var message = generateMessage(from, text);
        expect(message).toMatchObject({ from, text });
        expect(typeof message.createdAt).toBe('number');
    });
});

describe('generate location message', () => {
    it('should generate correct location object', () => {
        var from = 'vishal';
        var latitude = 123;
        var longitude = 123;
        var url = `https://www.google.com/maps?q=123,123`;
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message).toMatchObject({ from, url });
        expect(typeof message.createdAt).toBe('number');
    });
});