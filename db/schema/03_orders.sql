DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  total_price INTEGER NOT NULL,
  estimated_time INTEGER DEFAULT 0,
  created_at TIMESTAMP,
  confirmed_at TIMESTAMP,
  ready_at TIMESTAMP,
  picked_up_at TIMESTAMP
);
