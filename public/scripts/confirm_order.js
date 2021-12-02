//function to execute after DOM is ready

$(document).ready(function () {

	loadOrders();

	//eventlistener for submit button
	$(document).on('submit', "#orderform", function (event) {
		event.preventDefault();
	//	const str = $(this).serialize();
		confirmOrders(this);
	});
});

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

//render orders in 3 containers
const renderOrderData = function (orders) {
	$('.order-container1').empty();
	$('.order-container2').empty();
	$('.order-container3').empty();

	for (let order of orders) {
		if (order.ready_at !== null) {
			// hide estimated time and show created_at time
			let $orderData = createOrderElement(order,true,false);
			$('.order-container3').append($orderData);
		}
		else if(order.confirmed_at !== null ){
			let $orderData = createOrderElement(order,false,true);
			$('.order-container2').append($orderData);
		}
		else {
			let $orderData = createOrderElement(order,false,true);
			$('.order-container1').append($orderData);
	
		}
	}
}

const createOrderElement = function (orderData,hideEstTime,created_at) {
	//time when order was created (e.g.10 days ago)
	const $ordertime = timeago.format(orderData.created_at);

	let formAction,submit_button; 

	if (orderData.ready_at !== null) {
		formAction = "/owner/ready";
		submit_button = "Picked-up";
	}
	else if(orderData.confirmed_at !== null ){
		formAction = "/owner/orders";
		submit_button = "Order Ready";
	}

	else if(orderData.created_at !== null) {
		formAction = "/owner/new";
		submit_button = "Confirm Order"
	}

	const $orderItem = orderData.picked_up_at === null ? $(`<article class="art-order">
				<form class="confirmation-form" id="orderform" method= "POST" action="${formAction}" >
								Order id:	<input type ="text" name="order_id" size="2" value= ${orderData.id} readonly /> 
								User id:	<input type ="text" name="user_id" size="2" value= ${orderData.user_id} readonly/> 
								${hideEstTime ? ` <input type ="hidden" id="estime" size="2" value= ${orderData.estimated_time} />` : 
							`<br>Estimated time: <input type ="text" name="time" size="2" value= ${orderData.estimated_time} />`}
							${created_at ? '' : `<br>Order Placed:	 ${$ordertime} `}
									<button type="submit" id="confirm">${submit_button}</button>
									<hr>
									</form>
					</article>`): '';
	
	return $orderItem;
}

// send data to database when submit button of a form is pressed in container 
const confirmOrders = function (orderData) {
	const str= $(orderData).serialize();
	let formAction = orderData.action; 

	$.ajax({
		url: formAction,
		method: 'POST',
		data: str
	})
		.then((results) =>loadOrders(results))

}




