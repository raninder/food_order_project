
const createOrderElement = function (orderData) {

	//time when tweet was created (e.g.10 days ago)
	const $time1 = timeago.format(orderData.created_at);
	const $time2 = timeago.format(orderData.confirmed_at);
	const $time3 = timeago.format(orderData.ready_at);


	//render orders data
	
	let formAction; 
	if (orderData.ready_at !== null) {
		formAction = "/owner";
	}
	else if(orderData.confirmed_at !== null ){
		formAction = "/owner/orders";
	}
	else{
		formAction = "/owner/new";
	}

	const $orderItem = $(`<article class="art-order">
				<div class="ets-time"></div>
				<form class="confirmation-form" id="form2" method= "POST" action="${formAction}" >
					
								Order id:	<input type ="text" name="order_id" size="2" value= ${orderData.id} /> <br>
								User id:	<input type ="text" name="user_id" size="2" value= ${orderData.user_id} /> 
							<p class="est-time">	Estimated time: <input type ="text" name="time" size="2" value= ${orderData.estimated_time} /></p>
								Time:	 ${$time1} 
							
									<button type="submit" id="confirm">Submit</button>
									<hr>
									</form>
					</article>`);

	return $orderItem;
}


const renderOrderData = function (orders) {
	console.log("in jquery", orders);
	$('.order-container1').empty();
	$('.order-container2').empty();
	$('.order-container3').empty();
	for (let order of orders) {
		if (order.ready_at !== null) {
			let $orderData = createOrderElement(order);
			$('.order-container3').append($orderData);
			// $(".est-time").remove();
		}
		else if(order.confirmed_at !== null ){
			let $orderData = createOrderElement(order);
			$('.order-container2').append($orderData);
		}
		else {
			let $orderData = createOrderElement(order);
			$('.order-container1').append($orderData);
		}
	}
}

//load orders from specified url

const loadOrders = function () {
	const url = "/owner/new";
	$.ajax({
		url: url,
		method: 'GET',

	})
		.then((results) => {
			renderOrderData(results);
		})
}

const confirmOrders = function (orderData) {
	const str= $(orderData).serialize();
	alert(str);
	let formAction = orderData.action; 

	console.log("formaction",formAction);
	
	console.log("order----data", orderData);
	$.ajax({
		url: formAction,
		method: 'POST',
		data: str
	})
		.then((results) =>loadOrders(results))


}


//function to execute after DOM is ready

$(document).ready(function () {

	loadOrders();

	//eventlistener for submit(confirm) button
	$(document).on('submit', "#form2", function (event) {

		// prevent from submitting a form
		event.preventDefault();
		console.log("jquery");
		const str = $(this).serialize();
		//	const orderid = $('#orderdataid').val();
		console.log("str data",str);
		//post confirmed_at to now()
		confirmOrders(this);
	});
});

