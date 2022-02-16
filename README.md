# Introduction
A food ordering experience for a single restaurant. customers can select one or more dishes and place an order for pick-up. They will receive a notification when their order is ready. The restaurant(owner) and the client both are notified since this app serves as an intermediary.

When an order is placed the restaurant receives the order via SMS. The restaurant can then specify how long it will take to fulfill it. Once they provide this information, the website updates for the client and also notifies them via SMS.

# Stack 
- NodeJS
- Express
    RESTful routes
- jQuery and css
- PostgreSQL and pg (with promises) for DBMS

# Final Product
- User page allow a user to see menu and place order
!["Place order"](docs/order_placed.png)

- Owner page allow an Owner to see placed orders 
!["Orders"](docs/owner_orders.png)

- Owner page allow an Owner to confirm orders that order is processed. customer gets an SMS that his order is confirmed.
 !["Confirm order"](docs/confirm_order.png)

 - Owner page allow an Owner to confirm orders that order is ready for pickup. customer gets an SMS that his order is ready.
 !["Order Ready"](docs/order_ready.png)

 - Owner page allow an Owner to edit (add/delete/update) menu items. 
 !["Edit Menu"](docs/edit_menu.png)