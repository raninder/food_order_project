const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);
db.connect(() =>  console.log(`Connected to database`));

// Users & Owner
// get all foods from database
const getAllFoods = () => {

};
exports.getAllFoods = getAllFoods;

// Users
// get user's information by id
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
// get user's order status
const getStatusFromHistory = (id) => {

};
exports.getStatusFromHistory = getStatusFromHistory;
// user places an order
const addOrder = (order) => {

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
