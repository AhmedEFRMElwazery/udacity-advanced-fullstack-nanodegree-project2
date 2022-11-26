CREATE TABLE IF NOT EXISTS orders_table(
    id SERIAL PRIMARY KEY,
    status VARCHAR(50),
    user_id bigint REFERENCES users(id)
);