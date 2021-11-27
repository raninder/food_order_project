DROP TABLE IF EXISTS order_histories CASCADE;

CREATE TABLE order_histories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  order_requested_at TIMESTAMP,
  order_accepted_at TIMESTAMP,
  ready_at TIMESTAMP,
  picked_up_at TIMESTAMP
);
