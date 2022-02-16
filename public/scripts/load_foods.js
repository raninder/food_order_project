//load orders from specified url
const loadFoods = function() {
  const url = "/owner/menu";
  $.ajax({
    url: url,
    method: 'GET',
  })
    .then((results) => {
      renderFoodData(results);
    });
};

// display Food data from database
const renderFoodData = function(foods) {
  $('.food-container').empty();
  $('.food-container').append('<h3><center> Menu </center></h3>');
  $('.food-container').append('<tr><th style="width:100px">id</th><th style="width:300px">Name</th><th style="width:100px">Price</th></tr></thead>');
  for (let food of foods) {
    let $foodData = createFoodElement(food);
    $('.food-container').append($foodData);
  }

  //  add and delete buttons for editing Menu
  $('.food-container').append(`
	<br><br><div class="edit_button"><button type="button" class="edit_menu" data-inline="true" id="addbtn">Add Food</button>
		<button type="button" class="edit_menu" data-inline="true" id="delbtn">Delete Food</button></div>`);
};

const createFoodElement = function(foodData) {
  const $foodItem = $(`<section name= "food-container">
				<table class="foods-table">
									<tr>
										<td id="fid"> ${foodData.id}</td>
										<td > ${foodData.name}</td>
										<td > ${foodData.price}</td>
										</tr>
				</table>
				</section>
				`);
  return $foodItem;
};

module.exports = {loadFoods};