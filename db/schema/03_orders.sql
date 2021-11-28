DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  quantity SMALLINT NOT NULL,
  total_price INTEGER NOT NULL,
  order_created_at TIMESTAMP,
  order_accepted_at TIMESTAMP,
  ready_at TIMESTAMP
);
