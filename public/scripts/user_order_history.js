$(document).ready(() => {

  let $class = 0;

  const $orders = order => {
    const {total_price, picked_up_at, order_id} = order;
    let $completed = '';
    // if order completed, then show the time
    (picked_up_at) ? $completed = timeago.format(`${picked_up_at}`) : $completed = 'in progress';

    let $status =
    `<div id="order_history">
    <div id="history">
    <h3>Your Order History</h3>
    <span class="order_info">Order Number: <b>${order_id}</b></span>
    <br>
      <div class="order_list">
      <ol class="list_of_food${$class}">your order list</ol>
    </div>
    <span class="order_info">Total Price : <b>$${total_price}</b></span><br>
    <span class="order_info">Order Status : <b>${$completed}</b></span>
    </div>
    </div>`;

    return $status;
  };

  const $foodList = orders => {
    const {food_name, quantity, price} = orders;
    const $foods = `
    <li><b>${food_name}</b> <span>quantity: <b>${quantity}</b></span> <span>price: <b>$${quantity * price}</b></span></li>`;
    return $foods;
  };

  const $renderFoodList = orders => {
    orders.reduce((pre, cur) => {
      if (pre.order_id !== cur.order_id) {
        $class++;
        $(".order_history").append($orders(cur));
        $(`.list_of_food${$class}`).append($foodList(cur));
        return cur;
      } else if (pre.order_id === cur.order_id) {
        $(`.list_of_food${$class}`).append($foodList(cur));
        return cur;
      }
    }, 0);
  };

  // getting user id from url
  const userId = Number($(location).attr('pathname').substring(7));
  const $loadOrderStatus = () => {
    $.ajax({
      url: `/users/${userId}/order/status`,
      method: "GET",
      dataType: "json"
    })
      .then(data => $renderFoodList(data));
  };

  $loadOrderStatus();

  $(".order_history").hide();
  $(".your_history").click(() => {
    $(".order_history").toggle("slow");
    $(".order_box").toggle("slow");
  });
});

