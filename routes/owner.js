/*
 * All routes for Owner are defined here
 * Since this file is loaded in server.js into owner,
 *   these routes are mounted onto /owner
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

  // get all foods
  router.get('/menu', (req, res) => {
    db.getAllFoods()
      .then(foods => res.json(foods))
      .catch(err => {
        console.log(err.message);
        res.send(err);
      });
  });

  // add new food
  router.post('/menu', (req, res) => {
    db.addNewFood(food)
      .then(foods => res.json(foods))
      .catch(err => console.log(err.message));
  });

  // change food status (unavailable / available)
  router.post('/menu', (req, res) => {
    db.soldOut(food_id)
      .then(foods => res.json(foods))
      .catch(err => console.log(err.message));
  });

  // delete food
  router.post('/menu/delete', (req, res) => {
    db.deleteFood(food_id)
      .then(foods => res.json(foods))
      .catch(err => console.log(err.message));
  });

  // edit food
  router.post('/menu/edit', (req, res) => {
    db.editFood(eidit_food)
      .then(foods => res.json(foods))
      .catch(err => err.message);
  });

  // get order histories
  router.get('/histroy', (req, res) => {
    db.getOrderHistories()
      .then(history => res.json(history))
      .catch(err => err.message);
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
