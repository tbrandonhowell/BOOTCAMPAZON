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

insert into products (product_name,department_name,price,stock_quantity) values 
("Gibson Thunderbird Bass","Musical Instruments",2299.00,23),
("Fender Jimmy Page Telecaster","Musical Instruments",1399.99,16),
("Schecter Baron-H Vintage Bass","Musical Instruments",679.00,5),
("Interpol - The Marauder","Vinyl",21.99,325),
("The Afghan Whigs - In Spades","Vinyl",18.95,175),
("Blonde Redhead - Penny Sparkle","Vinyl",19.49,103),
("Hall & Oates - Greatest Hits","Vinyl",24.99,50),
("Hot Wheels Nissan R32 Skyline","Toys",5.49,24),
("Hot Wheels 71 Porsche 911","Toys",0.94,423),
("Hot Wheels Tesla Roadster","Toys",0.97,212);

select * from products;

update products set product_name = "Cheesesteak" where item_id = 11;
update products set department_name = "Prepared Foods" where item_id = 11;



