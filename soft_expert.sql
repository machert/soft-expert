CREATE TABLE product_type (
    id serial PRIMARY KEY,
    name varchar(50) not null
);

CREATE TABLE tax (
    id serial PRIMARY KEY,
    name varchar(50) not null
);

CREATE TABLE tax_product_type (
    id serial PRIMARY KEY,
    tax_id integer REFERENCES tax(id),
    product_type_id integer REFERENCES product_type(id),
    value numeric NOT NULL
);


CREATE TABLE product (
    id serial PRIMARY KEY,
    product_type_id integer REFERENCES product_type(id),
    name varchar(100) NOT NULL,
    value numeric NOT NULL
);
 

CREATE TABLE sale (
    id serial PRIMARY KEY,
    name_customer varchar(50) NOT NULL,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE sale_product (
    id serial PRIMARY KEY,
    sale_id integer REFERENCES sale(id) NOT NULL,
    product_id integer REFERENCES product(id) NOT NULL,
    quantity numeric NOT NULL
);