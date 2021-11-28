/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

module.exports = (db) => {
  // get new order
  router.get('/new', (req, res) => {
    db.getNewOrder()
      .then(order => {
        if (!order) res.send(null);
        res.json(order);
      })
      .catch(err => console.log(err.message));
  });

  // confirm new order
  router.post('/new', (req, res) => {
    db.placeOrder(orderId)
      .then(order => res.json(order))
      .catch(err => console.log(err.message));
  });

  // the order is preparing
  router.get('/orders', (req, res) => {
    db.getPlacedOrder()
      .then(order => {
        if (!order) res.send(null);
        res.json(order);
      })
      .catch(err => console.log(err.message));
  });

  // the order is ready
  router.post('/orders', (req, res) => {
    db.readyToPickUp(orderId)
      .then(order => res.json(order))
      .catch(err => console.log(err.message));
  });

  // the order is ready to pick up
  router.get('/ready', (req, res) => {
    db.getFoodsAreReady()
      .then(order => res.json(order))
      .catch(err => console.log(err.message));
  });

  // the order is picked up
  router.post('/ready', (req, res) => {
    db.pickedUp(orderId)
      .then(order => res.json(order))
      .catch(err => console.log(err.message));
  });
  return router;
};


// router.get("/", (req, res) => {
//   let query = `SELECT * FROM widgets`;
//   console.log(query);
//   db.query(query)
//     .then(data => {
//       const widgets = data.rows;
//       res.json({ widgets });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });
