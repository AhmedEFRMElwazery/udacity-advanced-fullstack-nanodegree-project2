CREATE TABLE IF NOT EXISTS orders_and_products_table(
    id SERIAL PRIMARY KEY,
    quantity integer,
    product_id bigint REFERENCES products_table(id),
    order_id bigint REFERENCES orders_table(id)
);