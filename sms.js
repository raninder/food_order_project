const twilio = require('twilio');
const  { accountSid, authToken } = require('./lib/sms');
const client = new twilio(accountSid, authToken);

// send SMS to owner when there's a new order
const sendNewOrder = () => {
  client.messages
    .create({
      body: 'New Order has been sent, Please check it out',
      from: '+1360515',
      to: '+1778901'
    })
    .then(message => console.log(message.sid));
};
exports.sendNewOrder = sendNewOrder;

// send SMS to user when owner confirm the order
const confirmedOrder = (time) => {
  client.messages
    .create({
      body: `Thank you for your order! Your order is confirmed, Estimated time is ${time} mins`,
      from: '+13605154640',
      to: '+17789'
    })
    .then(() => {
      // send reminder SMS to user when order will be ready in 5 mins
      setTimeout(() => {
        client.messages
          .create({
            body: `Your order will be ready in 5 mins`,
            from: '+13605154640',
            to: '+177890'
          })
          .then(message => console.log(message.sid));
      }, (time * 1000 * 60) - (5 * 1000 * 60));
    });
};
exports.confirmedOrder = confirmedOrder;

// send SMS when order is ready to pick up
const readyToPickUp = () => {
  client.messages
    .create({
      body: 'Your order is ready to pick up',
      from: '+13605154640',
      to: '+17789030711'
    })
    .then(message => console.log(message.sid));
};
exports.readyToPickUp = readyToPickUp;
