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

  $(".top").hide();
  $(window).scroll(() => {
    if ($(window).scrollTop() < 100) {
      $(".top").hide();
    } else {
      $(".top").show().fadeIn();
    }
  });
  $(".top").click(() => {
    $("html").animate({ scrollTop: 0 }, 400);
  });
});
