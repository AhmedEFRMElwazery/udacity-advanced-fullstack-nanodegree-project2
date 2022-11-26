CREATE TABLE IF NOT EXISTS users_table (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(58),
    lastName VARCHAR(58),
    password VARCHAR
);