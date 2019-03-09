create database bamazon;
use bamazon;

create table products (
	item_id int auto_increment not null,
    product_name varchar(50),
    department_name varchar(50),
    price decimal(10,2),
    stock_quantity integer,
    primary key (item_id)
);


