 drop table customers cascade;
 drop table manufacturers cascade;
 drop table purchaseorder cascade;
 drop table users cascade;
 drop table items cascade;
 drop table salesorder cascade;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(64),
    last_name VARCHAR(64),
    email VARCHAR(64)
);


CREATE TABLE manufacturers (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(64),
    contact_name VARCHAR(64),
    contact_email VARCHAR(64),
    contact_phone VARCHAR(64)
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(64),
    item_desc VARCHAR(64),
    manufacturer_id INTEGER REFERENCES manufacturers (id)
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(64),
    contact_name VARCHAR(64),
    contact_email VARCHAR(64),
    contact_phone VARCHAR(64)
);

CREATE TABLE purchaseOrder (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users (id),
    order_date TIMESTAMP WITH TIME ZONE,
    date_recieved TIMESTAMP WITH TIME ZONE,
    item_id INTEGER REFERENCES items (id),
    qty INTEGER
);

CREATE TABLE salesOrder (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers (id),
    order_date TIMESTAMP WITH TIME ZONE,
    date_recieved TIMESTAMP WITH TIME ZONE,
    item_id INTEGER REFERENCES items (id),
    qty INTEGER,
    user_id INTEGER REFERENCES users (id)
);