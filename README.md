# Cafe Au Lait

## Description
A full-stack MERN application that incorporates Web Socket IO to run live virtual cafe tables in the back end. Briefly, you can create a user and checkout menu items powered by Stripe integration. You can also chat with others at the virtual tables while enjoying your order!

MongoDB and Mongoose was used as a database for the menu items and tables. GraphQL was used to set up queries and mutations. And IndexedDB for the transactions. As for styling, the focus was on advanced CSS, while incorporating React Bootstrap.


## Table of Contents
* [Goal](#goal)
* [Installation](#installation)
* [Usage](#usage)
* [Deployed Link](#deployed-link)
* [License](#license)
* [Collaborators](#collaborators)

## User Story
```mb
AS a coffee conesuer 
I WANT to be able to browse and select menu items from a online cafe
SO THAT I can enjoy my morning coffee with others at a virtual table
```
## Acceptance Criteria
```mb
GIVEN an online dynamic cafe
WHEN I click order now on the homepage
THEN I am directed to a login/signup page.
WHEN I logged in as a user
THEN I can browse menu items using the categories at the top of the page
WHEN I see an item I would like to purchase
THEN I am presented with customize options for my order
WHEN I click add to cart
THEN I can see my order in my cart with a quantity and total cost
WHEN I change my mind about items in my cart
THEN I can click on the trash can to delete them from the shopping cart
WHEN I add items to my cart without being logged in
THEN I cannot checkout and am prompted to login
WHEN I click checkout
THEN I am taken to a page for my payment information
WHEN I click Tables in the navbar
THEN I am able select a table and "sit" at an available seat
WHEN I occupy a seat
THEN the colour of the seat turns black
WHEN I want to chat with others at my table
THEN I can use the chat box and send messages.
```
## Screen Shots

Landing Page

<img src="client\public\images\Screenshot (53).png" width= 45%>

Menu Section - Adding items

<img src="client\public\images\Screenshot (54).png" width= 45%>

Adding/Removing items from our Cart

<img src="client\public\images\Screenshot (55).png" width= 45%>

Virtual Cafe Tables showing chat feature

<img src="client\public\images\Screenshot (56).png" width= 45%>


## Goal
- Use React for the front end.
- Use GraphQL with a Node.js and Express.js server.
- Use MongoDB and the Mongoose ODM for the database.
- Use queries and mutations for retrieving, adding, updating, and deleting data.
- Use a polished UI.
- Be deployed using Heroku (with data).
- Be interactive (i.e., accept and respond to user input)
- Include authentication (JWT)


## Installation
Cafe Au Lait is deployed and functioning at https://cafe-au-lait.herokuapp.com/

Alternatively, you may also download this repository to your local computer or clone it using the url under Code. You can then open the application in Visual Studio Code and open the terminal from the root directory. In the command line, type in "npm install" to install all necessary dependencies and libraries: this may take some time so be patient. When that is complete, type in "npm run develop" (this will also take some time). When that has completed, the application will open in the browser on its own, or you can go to "http://localhost:3000" in your browser.

## Usage
Simply sign up on the website, and navigate to the menu. You can also preview menu items on the homepage at the top with the menu scroll. When you see an item you would like to purchase, click "Add to Cart" or "Customize" to add flavours etc. Go to the cart when you are ready to checkout, and your total with a quntity of each item will be listed there. From there, you can checkout and put in payment information. You can also click Tables at the top right, and be able to join a table and chat with others that are logged in. Available chairs are green, and taken chairs are black.

## Deployed Link
Click [here](https://cafe-au-lait.herokuapp.com/) for the deployed link through Heroku.


## License 
![badge](https://img.shields.io/badge/license-MIT-orange) 


## Collaborators
Alister Porteous Email: alisterporteous@hotmail.com

Github: https://github.com/porteous89

Nav Aulakh Email: navdeep_aulakh24@hotmail.com

Github: https://github.com/navaulakh24

Tamas Pinter Email: brolli_673@hotmail.com

Github: https://github.com/TamasPinter
