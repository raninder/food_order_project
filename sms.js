const twilio = require('twilio');
const  { accountSid, authToken } = require('./lib/sms');
console.log("twilio:" , accountSid, authToken);
const client = new twilio(accountSid, authToken);


const sendNewOrder = () => {
  client.messages
    .create({
      body: 'New Order has been sent, Please check it out',
      from: '+1',
      to: '+1'
    })
    .then(message => console.log(message.sid));
};
exports.sendNewOrder = sendNewOrder;

