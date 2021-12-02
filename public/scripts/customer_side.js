$(document).ready(function() {

  // this creates the food picture and price

  const create_picture_element = (item) =>  {
    const {id, name, photo, price} = item;
    // console.log("this is id and photo:" , id, photo);
    let html =
    `<div class="dish_and_price">
      <div class= "dish dish_${id}">
        <img class="dish_img" id="photo_${id}" src="${photo}"/>
      </div>
        <div class="dish_name_price">
          <div class="dish_name" id="dish_name_${id}">${name}</div>
          <div class="dish_price" id="dish_price_${id}">${price}</div>
        </div>
    </div>`;
    return html;
  };

  const render_picture = (arr) => {
    for (const i of arr) {
      $(".foods").append(create_picture_element(i));
    }
    attachClickHandler();
  };

  const $load_menu = () => {
    $.ajax({
      url: "/users/menu/foods",
      method: "GET",
      dataType: "json"
    })
      .then(data => {
        render_picture(data);
        return data;
      });
  };

  const attachClickHandler = () => {
    $(".dish_img").click(event => {
      console.log(event);
      const curElementId = event.currentTarget.id;
      const uniqueId = curElementId.substring(6);
      const dishNameId = '#dish_name_' + uniqueId;
      const dishPriceId = '#dish_price_' + uniqueId;
      const dishName = $(dishNameId).text();
      const dishPrice = $(dishPriceId).text();
      const dishImg = event.currentTarget.currentSrc;
      const dishData = {dishName, dishPrice, dishImg};
      renderOrders(dishData);
    });

  };

  const renderOrders = (dishData) => {
    let food =
    `<div class= "order_item">
    <img class="order_food_image" src="${dishData.dishImg}">
    <div class="order_item_name_quantity_price">
      <div class= "order_item_name">${dishData.dishName}</div>
      <div class="order_item_quantity_price">
        <div class= "order_item_price">$${dishData.dishPrice}</div>
        <div class= "order_item_quantity">&nbsp x 3 </div>
      </div>
    </div>
    </div>`;
    $(".order_area_items").append(food);
  };
  $load_menu();
});
