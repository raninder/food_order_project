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
      const curElementId = event.currentTarget.id;
      const uniqueId = curElementId.substring(6);
      const dishNameId = '#dish_name_' + uniqueId;
      const dishPriceId = '#dish_price_' + uniqueId;
      const dishName = $(dishNameId).text();
      const dishPrice = $(dishPriceId).text();
      const dishImg = event.currentTarget.currentSrc;
      const dishData = {dishName, dishPrice, dishImg, uniqueId};

      if (!$(`#name_${uniqueId}`).val()) {
        renderOrders(dishData);
        $(".total").hide();
        $(".checkout_price").val();
      } else {
        let $quantity = $(`#quantity_${uniqueId}`).val();
        $quantity++;
        $(`#quantity_${uniqueId}`).val($quantity);
        $(`#price_${dishData.uniqueId}`).val(dishPrice * $quantity);
        $(".total").val(dishPrice * $quantity);
      }

      let sum = 0;
      $('.total').each(() => {
        if (!isNaN($('.total').val())) {
          console.log(sum);
          sum += parseInt($('.order_item_price').val());
        }
      });
      $('.checkout_price').val(sum);
    });
  };

  const renderOrders = (dishData) => {
    let food =
    `<div class= "order_item">
    <img class="order_food_image" src="${dishData.dishImg}">
    <div class="order_item_name_quantity_price">
      <input type="text" name="dish_name" class="order_item_name" id="name_${dishData.uniqueId}" value="${dishData.dishName}" readonly/>
      <div class="order_item_quantity_price">
      $<output type="number" name="dish_price" class="order_item_price" id="price_${dishData.uniqueId}">${dishData.dishPrice}</output>
      <input type="number" name="dish_quantity" class="order_item_quantity" id="quantity_${dishData.uniqueId}" value="1"/>
      </div>
    </div>
    </div>
    <span class="total" for="total_price">${dishData.dishPrice}</span>`;
    $(".order_area_items").append(food);
  };
  $load_menu();
});
