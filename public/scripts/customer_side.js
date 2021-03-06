$(document).ready(function() {

  // this creates the food picture and price
  const createPictureElement = (item) =>  {
    const {id, name, photo, price} = item;
    let html =
    `<div class="dish_and_price">
      <div class= "dish dish_${id}">
        <img class="dish_img" id="photo_${id}" src="${photo}"/>
      </div>
        <div class="dish_name_price">
          <div class="dish_name" id="dish_name_${id}">${name}</div>
          <span>Price: $</span>
          <div class="dish_price" id="dish_price_${id}">${price}</div>
        </div>
    </div>`;
    return html;
  };

  const renderPicture = (arr) => {
    for (const i of arr) {
      $(".foods").append(createPictureElement(i));
    }
    attachClickHandler();
  };

  const $loadMenu = () => {
    $.ajax({
      url: "/users/menu/foods",
      method: "GET",
      dataType: "json"
    })
      .then(data => {
        renderPicture(data);
        return data;
      });
  };
  // save food name, food price * quantity
  const orderList = {};

  const attachClickHandler = () => {
    $(".dish_img").click(event => {
      const curElementId = event.currentTarget.id;
      const uniqueId = curElementId.substring(6);
      const dishNameId = '#dish_name_' + uniqueId;
      const dishPriceId = '#dish_price_' + uniqueId;
      const dishName = $(dishNameId).text();
      const dishPrice = $(dishPriceId).text();
      const dishImg = event.currentTarget.currentSrc;
      const dishData = {dishName, dishPrice, dishImg, uniqueId};

      // add food on the order list, if the food already exists, add quantity
      if (!$(`#name_${uniqueId}`).val()) {
        renderOrders(dishData);
        $(".checkout_price").val();
      } else {
        let $quantity = $(`#quantity_${uniqueId}`).val();
        $quantity++;
        $(`#quantity_${uniqueId}`).val($quantity);
        $(`#price_${dishData.uniqueId}`).val(dishPrice * $quantity);
      }

      // add food name: price
      let foodName = $(`#name_${dishData.uniqueId}`).val();
      let foodPrice = $(`#price_${dishData.uniqueId}`).text();
      orderList[foodName] = foodPrice;

      // sum all the price on the order list
      let priceOfFood = Object.values(orderList);
      let totalPrice = priceOfFood.reduce((pre, cur) => {
        pre = Number(pre);
        cur = Number(cur);
        pre += cur;
        return pre;
      });
      // total price
      $(".checkout_price").val(totalPrice);
    });
  };

  const renderOrders = (dishData) => {
    let food =
    `<div class= "order_item">
    <img class="order_food_image" src="${dishData.dishImg}">
    <div class="order_item_name_quantity_price">
      <input type="text" name="name" class="order_item_name" id="name_${dishData.uniqueId}" value="${dishData.dishName}" readonly/>
      <div class="order_item_quantity_price">
      $<output type="number" name="price" class="order_item_price" id="price_${dishData.uniqueId}">${dishData.dishPrice}</output>
      Qty<output type="number" name="qty" class="order_item_quantity" id="quantity_${dishData.uniqueId}">1</output>
      </div>
    </div>
    </div>`;
    $(".order_area_items").append(food);
  };
  $loadMenu();
});
