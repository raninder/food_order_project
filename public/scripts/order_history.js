$(document).ready(function() {
  // increase/change ol tag's class name
  let $class = 0;

  const $orders = orders => {
    const { order_id, user_id, user_name, total_price, picked_up_at } =  orders;
    let $completed = '';
    // chekcing order status
    (picked_up_at) ? $completed = 'completed' : $completed = 'in progress';

    const $orderDetail = `
    <div class="order">
      <p class="order_id">Order Number : <b>${order_id}</b></p>
      <span>User ID : <b>${user_id}</b> User Name: <b>${user_name}</b></span>
      <h3> Food list </h3>
        <ol class="food_list${$class}"></ol>
        <p>Total Price - $${total_price}</p>
        <p>Order Completed: <b>${$completed}</b>
    </div>
    `;
    return $orderDetail;
  };

  const $foodList = orders => {
    const {food_name, quantity, price} = orders;

    const $foods = `<li><b>${food_name}</b></li>
    <span>Qty: <b>${quantity}</b></span>
    <span>Price: <b>$${price * quantity}<b>`;
    return $foods;
  };

  const $renderOrderHistory = orders => {
    orders.reduce((pre, cur) => {
      // if order id is different, create new div.order (new tag)
      if (pre.order_id !== cur.order_id) {
        // increase/change ol tag's class name
        $class++;
        $(".history").append($orders(cur));
        $(`.food_list${$class}`).append($foodList(cur));
        return cur;
        // if order id is the same, append foods in the same food list.
      } else if (pre.order_id === cur.order_id) {
        $(`.food_list${$class}`).append($foodList(cur));
        return cur;
      }
    }, 0);
  };
  // GET order history data from /owner/history
  const $loadHistory = () => {
    $.ajax({
      url: "/owner/history",
      method: "GET",
      dataType: "json"
    })
      .then(data => $renderOrderHistory(data));
  };

  $loadHistory();

  $(".history").hide();
  $(".order_history").hide();
  // when order history button is clicked, hide .header / show .order_history
  $("#order_history").click(() => {
    $(".order_history").toggle("slow");
    $('.history').toggle("slow");
    $('.header').toggle("slow");
  });
});