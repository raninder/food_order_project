/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const sms = require('../sms');

module.exports = (db) => {
// get user's information from users table
  router.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.getUserById(userId)
      .then(data => res.json({user : data}))
      .catch(err => {
        console.log(err.message);
        res.send(err);
      });
  });

  // get all the menu from foods table
  router.get('/menu/foods', (req, res) => {
    db.getAllFoods()
      .then(data => res.json(data))
      .catch(err => {
        console.log(err.message);
        res.send(err);
      });
  });

  // place an order
  router.post('/:id/order', (req, res) => {
    const order = req.body;
    const userId = req.params.id;
    db.addOrder(order, userId)
      .then(data => {
        // sms.sendNewOrder();
        res.json(data);
      })
      .catch(err => {
        console.log(err.message);
        res.send(err);
      });
  });

  // get order status by user id
  router.get('/:id/order/status', (req, res) => {
    const userId = req.params.id;
    db.getOrderStatus(userId)
      .then(data => res.json(data))
      .catch(err => {
        console.log(err.message);
        res.send(err);
      });
  });
  return router;
};
