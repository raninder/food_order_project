INSERT INTO orders (user_id, total_price, created_at, confirmed_at, ready_at, picked_up_at)
VALUES (1, 27, now(), null, null, null),
(2, 30, now(), null, null, null),
(3, 40, now(), null, null, null),
(4, 50, now(), null, null, null),
(4, 28, now(), now(), now(), now()),
(2, 39, now(), now(), null, null),
(3, 34, now(), now(), now(), null),
(4, 28, now(), now(), now(), now());