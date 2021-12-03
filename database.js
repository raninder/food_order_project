const { urlencoded } = require("express");
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect(() =>  console.log(`Connected to database`));

// Users & Owner
// get all foods from database
const getAllFoods = () => {
  return db
    .query(`
    SELECT *
    FROM foods;
    `)
    .then(res => res.rows);
};
exports.getAllFoods = getAllFoods;

// Users
// get user's information by user id
const getUserById = (id) => {
  return db
    .query(`
    SELECT *
    FROM users
    WHERE id = $1;
    `, [id])
    .then(res => res.rows[0]);
};
exports.getUserById = getUserById;
// get order status by user id
const getOrderStatus = () => {
  return db
    .query(`
    SELECT order_details.*, orders.*, users.name as user_name, users.*, foods.*
    FROM orders
    LEFT JOIN order_details ON orders.id = order_id
    JOIN users ON users.id = user_id
    JOIN foods ON foods.name = food_name
    WHERE orders.id = order_id
    ORDER BY order_id DESC, foods.id
    `)
    .then(res => res.rows);
};
exports.getOrderStatus = getOrderStatus;
// user places an order
const addOrder = (order, userId) => {
  // if order is mutiple orders
  if (Array.isArray(order.name)) {
    const totalPrice = order.price.reduce((pre, cur) => {
      pre = Number(pre);
      cur = Number(cur);
      pre += cur;
      return pre;
    });
    // add order data to orders table
    return db
      .query(`
    INSERT INTO orders (user_id, total_price, created_at)
    VALUES ($1, $2, Now())
    RETURNING *;
    `, [userId, totalPrice])
      .then(res => {
        const orderId = res.rows[0].id;
        // add order details to order_details table
        for (const i in order.name) {
          db.query(`
        INSERT INTO order_details ( order_id, food_name, quantity )
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [orderId, order.name[i], order.qty[i]])
            .then(res => res.rows);
        }
      });
  // if order is a single order
  } else {
    return db
      .query(`
    INSERT INTO orders (user_id, total_price, created_at)
    VALUES ($1, $2, Now())
    RETURNING *;
    `, [userId, order.price])
      .then(res => {
        const orderId = res.rows[0].id;
        // add order details to order_details table
        db.query(`
          INSERT INTO order_details ( order_id, food_name, quantity )
          VALUES ($1, $2, $3)
          RETURNING *;
          `, [orderId, order.name, order.qty])
          .then(res => res.rows);
      });
  }
};
exports.addOrder = addOrder;

// Owner
// get new order / order status - your order has been sent to the restaurant
const getNewOrder = () => {
  return db
    .query(`
    SELECT *
    FROM orders
    `)
    .then(res => res.rows);
};
exports.getNewOrder = getNewOrder;

// confirm the order
const placeOrder = (id, time) => {
  return db
    .query(`
    UPDATE orders
    SET (confirmed_at, estimated_time) = (now(), $1)
    WHERE id = $2
    RETURNING *;
    `, [time, id])
    .then(res => {
      return res.rows;
    });
};
exports.placeOrder = placeOrder;
// order status - restaurant is preparing your food.
const getPlacedOrder = () => {
  return db
    .query(`
    SELECT *
    FROM orders
    WHERE picked_up_at IS NULL
    AND ready_at IS NULL
    AND confirmed_at IS NOT NULL
    AND created_at IS NOT NULL;
    `)
    .then(res => res.rows);
};
exports.getPlacedOrder = getPlacedOrder;

// order status - your order is ready to pick up
const orderIsReady = (id) => {
  return db
    .query(`
    UPDATE orders
    SET ready_at = Now()
    WHERE id = $1
    RETURNING *;
    `, [id])
    .then(res => res.rows);
};
exports.orderIsReady = orderIsReady;
// get prepared foods
const getFoodsAreReady = () => {
  return db
    .query(`
    SELECT *
    FROM orders
    WHERE picked_up_at IS NULL
    AND ready_at IS NOT NULL
    AND confirmed_at IS NOT NULL
    AND created_at IS NOT NULL;
    `)
    .then(res => res.rows);
};
exports.getFoodsAreReady = getFoodsAreReady;
// order status - you has picked up your food
const pickedUp = (orderId) => {
  return db
    .query(`
    UPDATE orders
    SET picked_up_at = Now()
    WHERE id = $1
    RETURNING *;
    `, [orderId])
    .then(res => res.rows);
};
exports.pickedUp = pickedUp;

const addNewFood = (food) => {
  const { name, photo, price } = food;
  const queryParams = [name, photo, price];
  const queryString = `
  INSERT INTO foods (name, photo, price)
  VALUES ($1, $2, $3)
  RETURNING *;`;

  return db.query(queryString, queryParams).then(res => res.rows);
};
exports.addNewFood = addNewFood;
// make the food unavailable
const soldOut = (foodId) => {
  return db
    .query(`
    UPDATE foods
    SET in_stock = FALSE
    WHERE id = $1
    RETURNING *;
    `, [foodId])
    .then(res => res.rows);
};
exports.soldOut = soldOut;
// delete food from database
const deleteFood = (id) => {
  return db
    .query(`
    DELETE FROM foods
    WHERE id = $1;
    `, [id])
    .then(res => res.rows);
};
exports.deleteFood = deleteFood;
// able to change picture, price, estimated time
const editFood = (edit) => {
  const { food_id, name, in_stock, picture_url, estimated_time, price } = edit;
  const queryParams = [name, in_stock, picture_url, estimated_time, price, food_id];
  const queryString = `
  UPDATE foods
  SET name = $1, in_stock = $2, photo = $3, estimated_time = $4, price = $5
  WHERE id = $6
  RETURNING *;`;

  return db.query(queryString, queryParams).then(res => res.rows);
};
exports.editFood = editFood;
// get totall order history (limit - 20)
const getOrderHistories = (limit = 20) => {
  return db
    .query(`
    SELECT order_details.*, orders.*, users.name as user_name, users.*, foods.*
    FROM orders
    LEFT JOIN order_details ON orders.id = order_id
    JOIN users ON users.id = user_id
    JOIN foods ON foods.name = food_name
    WHERE orders.id = order_id
    ORDER BY order_id DESC, foods.id
    LIMIT $1;
    `, [limit])
    .then(res => res.rows);
};
exports.getOrderHistories = getOrderHistories;

const getUserHistory = (userId) => {
  return db
    .query(`
    SELECT order_details.*, orders.*, users.name as user_name, users.*, foods.*
    FROM orders
    LEFT JOIN order_details ON orders.id = order_id
    JOIN users ON users.id = user_id
    JOIN foods ON foods.name = food_name
    WHERE orders.id = order_id
    AND user_id = $1
    ORDER BY order_id DESC, foods.id
  `, [userId])
    .then(res => res.rows);
};
exports.getUserHistory = getUserHistory;
