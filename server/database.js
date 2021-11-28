const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
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
const getOrderStatus = (user_id) => {
  return db
    .query(`
    SELECT created_at, accepted_at, ready_at, picked_up_at
    FROM orders
    JOIN order_histories ON order_id = orders.id
    WHERE orders.user_id = $1;
    `, [user_id])
    .then(res => res.rows);
};
exports.getOrderStatus = getOrderStatus;
// user places an order
const addOrder = (order, userId) => {
  const { quantity, total_price, created_at } = order;
  return db
    .query(`
    INSERT INTO orders (user_id, quantity, total_price, created_at)
    VALUES ($1, $2, $3, $4);
    `, [quantity, total_price, created_at, userId])
    .then(res => res.rows);
};
exports.addOrder = addOrder;

// Owner
// get new order / order status - your order has been sent to the restaurant
const getNewOrder = () => {


};
exports.getNewOrder = getNewOrder;
// order status - your order has been placed. restaurant is preparing your food.
const placeOrder = () => {

};
exports.placeOrder = placeOrder;
// order status - your order is ready to pick up
const readyToPickUp = () => {

};
exports.readyToPickUp = readyToPickUp;
// get prepared foods
const getFoodsAreReady = () => {

};
exports.getFoodsAreReady = getFoodsAreReady;
// order status - you has picked up your food
const pickedUp = () => {

};
exports.pickedUp = pickedUp;

const addNewFood = () => {

};
exports.addNewFood = addNewFood;
// make the food unavailable
const soldOut = () => {

};
exports.soldOut = soldOut;
// delete food from database
const deleteFood = () => {

};
exports.deleteFood = deleteFood;
// able to change picture, price, estimated time
const editFood = () => {

};
exports.editFood = editFood;
// get totall order history (limit - 20)
const getOrderHistories = () => {

};
exports.getOrderHistories = getOrderHistories;
