# plan

* ## in User session
  1. take a look at the menu
  2. put foods in cart
  3. place the order
  4. check order status


* ## in Manager session
  1. confrim order when users order
  2. send SMS to users
  3. update order status & send SMS
  4. delete order on the order list when user picks up the order


* ## work flow
1. when user make an order, send SMS to manager
2. when manager confirms the order, send SMS to user
3. count the estimate time (stretch?)
4. send SMS to user when the order is ready in 5 mins (stretch?)
5. when manager press ready button (= when order is ready), send SMS to user
6. when manager press picked up button(= when user picked up the order), delete the order on the order list


* ## order status (website, SMS)
  1. confirmed your order ${order.name, order.nub}
     we placed your order
     the estimated time is 20 mins
  2. your order will be ready in 5 mins
  3. your order is ready to pick up 


## stretch
1. user can save their favourite foods. (by clicking on like button)
2. review of the food
3. rate the food
4. communicate with manager or users
