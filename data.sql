INSERT INTO users (first_name, last_name, email) VALUES ('Jason', 'Taylor', 'email');
INSERT INTO users (first_name, last_name, email) VALUES ('Nick', 'Orfitelli', 'email1');
INSERT INTO manufacturers (company_name, contact_name, contact_email, contact_phone) VALUES ('ACME','Billy Bob', 'contactEmail', '555-867-5309');
INSERT INTO manufacturers (company_name, contact_name, contact_email, contact_phone) VALUES ('Galvanize','Pete Silva', 'contactEmail', '555-123-4567');

INSERT INTO customers (company_name, contact_name, contact_email, contact_phone) VALUES ('custCompany1','Donald Duck', 'contactEmail', '555-123-4567');
INSERT INTO customers (company_name, contact_name, contact_email, contact_phone) VALUES ('custCompany2','Mickey Mouse', 'contactEmail', '555-123-4567');
INSERT INTO customers (company_name, contact_name, contact_email, contact_phone) VALUES ('SAIC', 'John', 'contactEmail4', '707-232-4159');
INSERT INTO customers (company_name, contact_name, contact_email, contact_phone) VALUES ('Leidos', 'Shawn', 'contactEmail8', '707-232-4677');


INSERT INTO items (item_name, item_desc, manufacturer_id) VALUES ('Rocket', 'Best Rocket Ever', (SELECT id FROM manufacturers WHERE company_name = 'ACME'));
INSERT INTO items (item_name, item_desc, manufacturer_id) VALUES ('Airplane', 'Best Airplane Ever', (SELECT id FROM manufacturers WHERE company_name = 'Galvanize'));



INSERT INTO purchaseorder (user_id, order_date,date_recieved,item_id,qty) VALUES ((SELECT id FROM users WHERE first_name = 'Jason'), '2004-10-19 10:23:54+02', '2005-10-19 10:43:54+02',
    (SELECT id FROM items WHERE item_name = 'Rocket'), 4);

INSERT INTO purchaseorder (user_id, order_date,date_recieved,item_id,qty) VALUES ((SELECT id FROM users WHERE first_name = 'Nick'),'2003-11-19 08:23:54+02', '2020-10-13 05:22:54+02',
    (SELECT id FROM items WHERE item_name = 'Airplane'), 4);

INSERT INTO salesorder (customer_id, order_date,date_recieved,item_id,qty,user_id) VALUES ((SELECT id FROM customers WHERE contact_name = 'John'),
    '2011-11-19 08:23:54+02','2012-11-19 08:23:54+02',
    (SELECT id FROM items WHERE item_name = 'Rocket'), 3, 
    (SELECT id FROM users WHERE email = 'email'));

INSERT INTO salesorder (customer_id, order_date,date_recieved,item_id,qty,user_id) VALUES ((SELECT id FROM customers WHERE contact_name = 'Shawn'),
    '2012-11-19 08:23:54+02','2013-11-19 09:23:54+02',
    (SELECT id FROM items WHERE item_name = 'Airplane'), 3, 
    (SELECT id FROM users WHERE email = 'email1'));