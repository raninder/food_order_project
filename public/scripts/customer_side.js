$(document).ready(function() {

  // this creates the food picture and price

  const create_picture_element = (item) =>  {
    let html = []
    html.push(
    `<div class="dish_and_price">
      <div class= "dish">         
        <img style ="width :20em; height: 20em;" src="${item.photo}"></img>
      </div>
        <div class="dish_price">${item.price}</div>
    </div>`);
    return html
  }

  const render_picture = (arr) => {
    for (const i of arr) {
      $(".foods").append(create_picture_element(i))
    }
  }

  const $load_menu = () => {
    $.ajax({
      url: "/users/menu/foods",
      method: "GET",
      dataType: "json"
    })
    .then((data) => {
      console.log("this is received from the menu/foods:" , data);
      render_picture(data);


    });
  };

let shopping_cart = [];
console.log("12345");

  $(".foods").on("click", ".dish_and_price",  function(event) {
    // event.preventDefault();
    console.log("123");
    console.log($(this).find(".dish_price").html())
  })


  $load_menu();

});