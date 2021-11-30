
const createOrderElement = function(orderData) {

	//time when tweet was created (e.g.10 days ago)
	const $time = timeago.format(orderData.created_at);

	//escaping text input for any script tag in tweet
	//const safeHTML = `${escape(tweetData.content.text)}`;
	
	//render orders data
	
				const $orderItem = $(`<article class="art-order">
				<form class="confirmation-form" id="form2" method= "POST" action="/new" >
				
								Order id:	<input type ="text" name="order_id" size="2" value= ${orderData.id} /> <br>
								User id:	<input type ="text" name="user_id" size="2" value= ${orderData.user_id} />	<br>
								Time:	 ${$time} 
							
									<button type="submit" id="confirm">confirmed</button>
									<hr>
									</form>
					</article>`);

	return $orderItem;
}

const renderOrderData = function(orders) {
console.log("in jquery",orders);
	$('.order-container').empty();

	for (let order of orders) {
			let $orderData = createOrderElement(order);
			$('.order-container').append($orderData);
	}

}

//load orders from specified url

const loadOrders = function() {
	const url = "/owner/new";
	$.ajax({
					url: url,
					method: 'GET',

			})
			.then((results) => {
					renderOrderData(results);
			})
}

const confirmOrders = function(orderData) {
	const url = "/owner/new";
	console.log("order----data",orderData);
	$.ajax({
					url: url,
					method: 'POST',
					data: orderData
			})
			.then((results) => {
					//console.log("order----id",results)
				loadOrders(results);
			})
}

// //function for escaping any malicious content from tweet input like <script>alert("hi");</script>

// const escape = function(str) {
// 	let div = document.createElement("div");
// 	div.appendChild(document.createTextNode(str));
// 	return div.innerHTML;
// };

//function to execute after DOM is ready

$(document).ready(function() {
	
	loadOrders();

	//eventlistener for submit(confirm) button
	$(document).on('submit',"#form2",function(event) {

			// prevent from submitting a form
			event.preventDefault();
			console.log("jquery");
			const str = $(this).serialize();
		//	const orderid = $('#orderdataid').val();
			alert(str);
			//post confirmed_at to now()
			confirmOrders(str);
	});
});