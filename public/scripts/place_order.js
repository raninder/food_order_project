$(document).ready(function() {
  const userId = Number($(location).attr('pathname').substring(7));

  $("form").submit(event => {
    event.preventDefault();
    //food names
    const name = [];
    $('input[name="name"]').each((index, item) => {
      name.push(item.value);
    });
    //quatities
    const qty = [];
    $('output[name="qty"]').each((index, item) => {
      qty.push(item.value);
    });
    //prices
    const price = [];
    $('output[name="price"]').each((index, item) => {
      price.push(item.value);
    });

    let orderDetail = { "name": name, "qty": qty, "price": price };

    // send order detail to server
    if (orderDetail.name.length) {
      $.ajax({
        url: `/users/${userId}/order`,
        method: "POST",
        dataType: "json",
        data: orderDetail,
        success: sendMessage()
      });
    } else {
      alert("There's no order on your order list");
    }
  });
  const sendMessage = () => {
    alert("Your order has been sent to restaurant!");
    $(".order_item").remove();
    $(".checkout_price").val(0);
  };
});
