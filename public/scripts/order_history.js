$(document).ready(function() {

  let $class = 0;
  const $orders = orders => {

    const { order_id, user_id, user_name, total_price, picked_up_at } =  orders;
    let $completed = '';
    (picked_up_at) ? $completed = 'completed' : $completed = 'in progress';
    const $orderDetail = `
    <div>
      <p class="order_id">${order_id}</p>
      <span>User ID : ${user_id} User Name: ${user_name}</span>
      <h5> Food list </h5>
        <ol class="food_list${$class}"></ol>

      <p>Total Price - $${total_price}</p>
      <p>Order Completed: ${$completed}
        <hr>
    </div>
    <hr>
    `;
    return $orderDetail;
  };

  const $foodList = orders => {

    const {food_name, quantity} = orders;

    const $foods = `<li>${food_name} Qty: ${quantity}</li>`;
    return $foods;
  };


  const $renderOrderHistory = orders => {
    orders.reduce((pre, cur) => {

      if (pre.order_id !== cur.order_id) {
        $class++;
        $(".history").append($orders(cur));
        $(`.food_list${$class}`).append($foodList(cur));
        return cur;
      } else if (pre.order_id === cur.order_id) {
        $(`.food_list${$class}`).append($foodList(cur));
        return cur;
      }
    }, 0);
  };

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

  $("#order_history").click(event => {
    // $(".history").slideToggle();
    $(".order_history").toggle("slow");
    $('.history').toggle("slow");

  });
});
