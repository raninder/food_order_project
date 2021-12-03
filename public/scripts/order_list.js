$(document).ready(() => {

  $(window).scroll(function() {

    if ($(this).scrollTop() > 200) {
      $(".order_box").css('position','fixed');
      $(".order_box").css('top','100px');
    } else {
      $(".order_box").css('position','fixed');
      $(".order_box").css('top','400px');
    }
  });
});
