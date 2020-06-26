# DB SCHEMA

Users
first name
last name
email

manufacturer

item
id PK
name
description
manufacturer FK

customers
company name
contact name
contact email
contact phone

PurchaseOrder
id PK
ordered Date
date recieved
item.id FK
user.id FK
qty

// PO_items
// id PK
// po.id FK
// item item.id FK
// qty

SalesOrder
id PK
customer.id FK
ordered Date
date recieved
item.id FK
qty
user.id FK
