var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

client.messages.create({
    body: 'Hello from Node',
    to:   '+13344254514',     // your real-world cell number
    from: '+18339875819'      // your Twilio phone number
})
.then((message) => console.log(message.sid));
