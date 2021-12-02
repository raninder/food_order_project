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

function addForm(){
	$('.food-container').empty();
	
	$('.food-container').append(`<form id= "addfood" method= "post" action = "/owner/menu">
				Food name:<input type= "text" name="name" size="10"/> <br>
				URL	<input type ="text" name="photo" size="10" /> <br>
				Price	<input type ="text" name="price" size="3" /><br>
				<button type="submit" id="addsubmit">Submit</button>
				</form>					
		
				`);
	
}
	
function deleteForm(){
	$('.food-container').empty();
	$('.food-container').append(`<form id= "delfood" method= "post" action = "/owner/menu/delete">
				Food id:<input type= "text" name="id" size="2"/> <br>
			
				<button type="submit" id="delsubmit">Submit</button>
				</form>					
		
				`);
	
}

// //load orders from specified url

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

const renderFoodData = function (foods) {
	console.log("in jquery", foods);
	$('.food-container').empty();
	$('.food-container').append('<h3> Menu </h3>');
	$('.food-container').append('<tr><th>id</th><th>Name</th><th>Price</th></tr></thead>');
	for (let food of foods) {
			let $foodData = createFoodElement(food);
			$('.food-container').append($foodData);
		}
	
		$('.food-container').append(`
	<center><button type="button" data-inline="true" id="addbtn">Add Food item</button>
		<button type="button" data-inline="true" id="delbtn">Delete Food item</button></center>`);	
}

const createFoodElement = function (foodData) {

	const $foodItem = $(`<section name= "food-container">
				<table id="foods-table">
					
									<tr>
									<td> ${foodData.id}</td>
									<td > ${foodData.name}</td>
									<td > ${foodData.price}</td>
									</tr>
									</table>
									<br>
										
		
				`);
	
	return $foodItem;
}

// when submit button of a form is pressed in container 
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




