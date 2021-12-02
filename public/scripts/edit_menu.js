//function to execute after DOM is ready

$(document).ready(function () {
	$("#edit_menu").click(() => {
		loadFoods();
    // $(".edit_menu").toggle("slow");
    //  $('.menu').toggle("slow");
     $('.header').hide();
  });

	
	$(document).on('click','#addbtn',addForm);
	$(document).on('submit', "#addfood", function (event) {
		event.preventDefault();
		postNewFood(this);
		loadFoods();
	});

$(document).on('click','#delbtn',deleteForm);
$(document).on('submit', "#delfood", function (event) {

	event.preventDefault();
	delFood(this);
	loadFoods();
});
});

//add new food item in Menu
function addForm(){
	$('.food-container').empty();
	$('.food-container').append(`<form id= "addfood" method= "post" action = "/owner/menu">
				<h3><center> Add Food Item</center></h3>
				Food Name:<input type= "text" name="name" size="10"/> <br><br>
				URL:	<input type ="text" name="photo" size="10" /> <br><br>
				Price:	<input type ="text" name="price" size="3" /><br><br>
				<center><button type="submit" id="addsubmit">Submit</button></center>
				</form>				
				`);
	
}
	
//delete food item from Menu
function deleteForm(){
	//$('.food-container').empty();
	$('.food-container').append(`<form id= "delfood" method= "post" action = "/owner/menu/delete"><br>
				Enter Food id:<input type= "text" name="id" size="5"/> <br><br>
				<center><button type="submit" id="delsubmit">Submit</button></center>
				</form>					
				`);
}

//load orders from specified url
const loadFoods = function () {
	const url = "/owner/menu";
	$.ajax({
		url: url,
		method: 'GET',
	})
		.then((results) => {
			renderFoodData(results);
		})
}

// display Food data from database
const renderFoodData = function (foods) {
	$('.food-container').empty();
	$('.food-container').append('<h3><center> Menu </center></h3>');
	$('.food-container').append('<tr><th style="width:100px">id</th><th style="width:300px">Name</th><th style="width:100px">Price</th></tr></thead>');
	for (let food of foods) {
			let $foodData = createFoodElement(food);
			$('.food-container').append($foodData);
	}

//  add and delete buttons for editing Menu
	$('.food-container').append(`
	<br><br><center><button type="button" data-inline="true" id="addbtn">Add Food item</button>
		<button type="button" data-inline="true" id="delbtn">Delete Food item</button></center>`);	
	}

const createFoodElement = function (foodData) {
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
}

// when submit button of add form is pressed, add to database
const postNewFood = function (newFood) {
	const data= $(newFood).serialize();

	$.ajax({
		url: '/owner/menu',
		method: 'POST',
		data: data
	})
		.then((results) =>
		{	alert("Food item submitted");
			return renderFoodData(results)})
}

// when submit button of delete form is pressed, delete from database
const delFood = function (foodId) {
	const data= $(foodId).serialize();

	$.ajax({
		url: '/owner/menu/delete',
		method: 'POST',
		data: data
	})
		.then((results) =>
		{	alert("Food item deleted");
			return renderFoodData(results)})
}




