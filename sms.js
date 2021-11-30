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

const confirmedOrder = () => {
  client.messages
    .create({
      body: 'Your order is confirmed, Estimated time is 20 mins',
      from: '+1',
      to: '+1'
    })
    .then(message => console.log(message.sid));
};
exports.confirmedOrder = confirmedOrder;

const readyToPickUp = () => {
  client.messages
    .create({
      body: 'Your order is ready to pick up',
      from: '+1',
      to: '+1'
    })
    .then(message => console.log(message.sid));
};
exports.readyToPickUp = readyToPickUp;
