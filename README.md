# JDA-Bank

## Description

JDA is a MVC REST API app that allows money transfer, credit and debit tracking. The purpose of this project is to build a fullstack app that allows users to make an account with encrpyted password and have information render only if the user is logged in.

The backend of the project was built with Sequelize for the database and REST API for the client-server architecture. A big part of the project was to understand CRUD operation through node.js/express.js. The controller includes all the get routes, dictating where data needs to go. In this project, the userRoutes controls the creation of the user, login, and logout. The transactionRoutes controls everything regarding to transactions, such as updating recipient/sender balance, defining credit/debit transactions and retreiving all transactions to render a transaction history list.

The frontend of the project was done with Handlebars. Handlebars with the MVC model allows pages to be broken up into different layout files making it easier for groups projects. Under the public folder a script file is included for each form function. For example, the transaction.js script (the most important function of this project) grabs hidden values from the form in layouts/homepage.handlebars does the calculations and then passes the information to backend.

A big take away from this project was the importance how the database is contructed. For example, the transaction database only includes recipient, which made rendering sender/recipient information more difficult because this is an interacton between two users. An ending balance should've been included in the user database which would make it much easier to create a running balance. Due to a weak database design, a lot of work had to be done in the frontend to manipulate the data before going into the backend for processing.

URL to deployed app:

https://jda-bank.herokuapp.com/login

## Installation

Please look at the package.json file for dependencies and at the root folder use command npm i. Before starting the app, please create a .env file at the root and include the following: DB_NAME, DB_PASSWORD, DB_USER. Run MySql and seeds followed by nodemon.

## Screenshots

Signup page:
![Screenshot 2022-12-18 at 4 12 21 PM](https://user-images.githubusercontent.com/97267318/208326904-7a936e5b-f400-4e8e-a86f-85c8f17acbd9.png)

Login page:
![Screenshot 2022-12-18 at 4 15 16 PM](https://user-images.githubusercontent.com/97267318/208327022-f82fc4db-14ca-4bde-9add-214b33467e76.png)

Home page:
<img width="841" alt="Screenshot 2022-12-18 at 4 06 29 PM" src="https://user-images.githubusercontent.com/97267318/208326839-84ce35d4-dc7d-4dc2-9e27-839e3d01490b.png">

Usage info / chart:
<img width="1668" alt="Screenshot 2022-12-18 at 4 06 45 PM" src="https://user-images.githubusercontent.com/97267318/208326842-b8247165-12b5-410c-8ad8-329af528a54e.png">
