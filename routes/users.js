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

  router.get("/", (req, res) => {
    res.render('customer_side');
  });

  router.get("/:id", (req, res) => {
    res.render('customer_side');
  });

  // get user's information from users table
  router.get('/:id/info', (req, res) => {
    const userId = req.params.id;
    db.getUserById(userId)
      .then(data => res.json(data))
      .catch(err => {
        console.log(err.message);
        res.send(err);
      });
  });

  // get all the menu from foods table
  router.get('/menu/foods', (req, res) => {
    console.log("getting the foods:");
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
        res.json(data);
        //send message to owner
        sms.sendNewOrder();
      })
      .catch(err => {
        console.log(err.message);
        res.send(err);
      });
  });

  // get order status by user id
  router.get('/:id/order/status', (req, res) => {
    const userId = req.params.id;
    db.getUserHistory(userId)
      .then(data => res.json(data))
      .catch(err => {
        console.log(err.message);
        res.send(err);
      });
  });
  return router;
};
