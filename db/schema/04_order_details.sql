DROP TABLE IF EXISTS order_details CASCADE;

CREATE TABLE order_details (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  food_name VARCHAR(255) REFERENCES foods(name) ON DELETE CASCADE,
  quantity INTEGER NOT NULL
);
