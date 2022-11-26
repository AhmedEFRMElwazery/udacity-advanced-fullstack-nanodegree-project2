# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `'/products'` [GET]
- Show `'/products/:id'` [GET]
- Create  `'/products'` [POST] (token required)

#### Users

- Index `'/users'` [GET] (token required)
- Show `'/users/:id'` [GET] (token required)
- Create `'/users'` [POST] (token required)

#### Orders

- Current Order by user (required args: user id) `'/orders/:id'` [GET] (token required)

#### Orders_Products

- Orders_Products (required args: id) `'/orders/:id/products'` [POST] (token required)

## Data Shapes

#### Product

```
CREATE TABLE IF NOT EXISTS products_table (id SERIAL PRIMARY KEY, name VARCHAR(110), price integer, category VARCHAR(50));
```

- id (type - integer) [serial primary key]
- name (type - VARCHAR(110): variable number of characters with a maximum of 110 characters)
- price (type - integer)
- category (type - VARCHAR(50): variable number of characters with a maximum of 50 characters)

#### User

```
CREATE TABLE IF NOT EXISTS users_table (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(58),
    lastName VARCHAR(58),
    password VARCHAR
);
```

- id (type - integer) [SERIAL PRIMARY KEY]
- firstName (type - VARCHAR(58): variable number of characters with a maximum of 58 characters)
- lastName (type - VARCHAR(58): variable number of characters with a maximum of 58 characters)
- password (type - VARCHAR: variable number of characters with an unspecified number of characters limit)

#### Orders

```
CREATE TABLE IF NOT EXISTS orders_table(
    id SERIAL PRIMARY KEY,
    status VARCHAR(50),
    user_id bigint REFERENCES users(id)
);
```

- id (type - integer) [SERIAL PRIMARY KEY]
- user_id (type - bigint)
- status of order (active or complete) - lastName (type - VARCHAR(50): variable number of characters with a maximum of 50 characters)

#### orders_products

```
CREATE TABLE IF NOT EXISTS orders_and_products_table(
    id SERIAL PRIMARY KEY,
    quantity integer,
    product_id bigint REFERENCES products(id),
    order_id bigint REFERENCES orders(id)
);
```

- id (type - integer) [SERIAL PRIMARY KEY]
- quantity (type - integer)
- order_id (type - bigint)
- product_id (type - bigint)