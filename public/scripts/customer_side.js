// const add_to_cart = function(photo) {
//   console.log("item:", photo);
//   const selectedimage = `<img class="dish_img" src= ${photo}/>`
//   $(".chosen_items").append(selectedimage);
// }



$(document).ready(function() {

  // this creates the food picture and price

  const create_picture_element = (item) =>  {
    const {id, photo, price} = item;
    console.log("this is id and photo:" , id, photo);
    let html = 
    `<div class="dish_and_price">
      <div class= "dish dish_${id}">         
        <img class="dish_img" src="${photo}"/>
      </div>
        <div class="dish_price">${price}</div>
    </div>`;
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
      render_picture(data);


    });
  };

let shopping_cart = [];

  // $(".foods").on("click", ".dish_and_price",  function() {
    // event.preventDefault();
    // console.log($(this))


    // $(".food_picked").append($(".dish_img"))
    // console.log($(this).find(".dish_price").html())
  // })

  // $("div")
  // $("#id")
  // $(".className")
  // $(this)

  $load_menu();

});