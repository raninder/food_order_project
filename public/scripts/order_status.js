$(document).ready(() => {

  const $orderStatus = order => {
    const {order_id, confirmed_at, ready_at, picked_up_at} = order;
    let statusMessage = '';

    // change order status message
    if (confirmed_at === null) {
      statusMessage = "Restuarant hasn't confirmed your order";
    } else if (ready_at === null) {
      statusMessage = 'Restuarant confirmed your order, your order is now preparing';
    } else if (picked_up_at === null) {
      statusMessage = "Your order is ready to pick up";
    }

    let $status =
    `<h3>Your Order Status</h3>
    <h4>Order Number : ${order_id}</h4>
    <span class="status"><span>${statusMessage}<span></span>`;
    return $status;
  };

  const $renderStatus = orders => {
    orders.forEach(order => {
      if (order.picked_up_at === null && order.created_at !== null) {
        $(".order_status").empty();
        $(".order_status").append($orderStatus(order));
      }
    });
  };

  // getting user id from url
  const userId = Number($(location).attr('pathname').substring(7));

  const $loadOrderStatus = () => {
    $.ajax({
      url: `/users/${userId}/order/status`,
      method: "GET",
      dataType: "json"
    })
      .then(data => $renderStatus(data));
  };

  $loadOrderStatus();

  $(".order_status").hide();
  $(".your_order").click(() => {
    $(".order_status").toggle("slow");
  });
});
