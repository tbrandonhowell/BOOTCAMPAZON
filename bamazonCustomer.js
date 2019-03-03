// TIME SPENT:
// 3/1 2:15
// 3/2 0:50
// 3/2 


// 5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

// 6. The app should then prompt users with two messages.

//    * The first should ask them the ID of the product they would like to buy.
//    * The second message should ask how many units of the product they would like to buy.

// 7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.

/* 
X - connect to db
X - pull the full db over into an array/objects
X - barf it out to the terminal
X - inquire "what product would you like to buy"
X - inquire "how many would you like to buy"
X - compare # ordered against quantity in the object
X - logic for having enough quantity or not
X - update db to remove quantity
X - show total cost of purchase
X - ask whether they want to keep shopping
TODO: 11 - exit or reload the inquirer trigger
TODO: give them a way to get out of the app by entering Q
*/


// TODO: need to have some sort of data input validation happening
// TODO: ALSO set my queries to sanitize user input

// =============================================
// NPM PACKAGES
const mysql = require("mysql");
const inquirer = require("inquirer");
// const table = require("table");
const {table} = require('table');
// ^^ not sure why this works but the normal require doesn't
const chalk = require('chalk');
// =============================================


// =============================================
// GLOBALS
var updateQuantity;
var updateID;
// =============================================


// =============================================
// CREATE CONNECTION OBJECT
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "uncb00tc4mp",
    database: "bamazon"
});
// =============================================


// =============================================
// customer() FUNCTION
var customer = function() {
    // connect to DB
    connection.connect(function(err){
        if(err) throw err;
        // run our query
        connection.query('select * from products', function(err, data) {
            if (err) throw err;
            console.log(chalk.red.bold("\n============================================="));
            console.log(chalk.red.bold("||          WELCOME TO BOOTCAMPAZON        ||"));
            console.log(chalk.red.bold("=============================================\n"));
            // display the data w/ table package
            let output;
            let tableData = [];
            tableData.push([
                chalk.yellow.bold("ID"),
                chalk.yellow.bold("Product"),
                chalk.yellow.bold("Department"),
                chalk.yellow.bold("In Stock"),
                chalk.yellow.bold("Price")
            ]);
            for (i=0;i<data.length;i++) {
                var newArray = [
                    data[i].item_id,
                    data[i].product_name,
                    data[i].department_name,
                    data[i].stock_quantity,
                    data[i].price.toFixed(2)
                ];
                tableData.push(newArray);
            }
            output = table(tableData);
            console.log(output);
            // get user input
            inquirer.prompt([
                {
                    type: "number",
                    message: "Enter the Item ID of the product you would like to purchase.",
                    name: "buyID",
                    // validate: function validateInt(input) {

                    // }
                },
                {
                    type: "input",
                    message: "How many would you like to purchase?",
                    name: "buyQuantity"
                }
            ]).then(function(response) {
                // is there enough stock?
                console.log("Wants to buy " + response.buyQuantity + " of Item ID " + response.buyID + ".");
                // console.log("There are " + data[response.buyID].stock_quantity + " in stock.");
                // TODO: ^^ this doesn't work b/c we're looking at the array entry corresponding with the response.buyID, not the array entry containing an object with the item_ID corresponding to response.buyID.
                // TODO: could do a second query to the DB, but that seems too.... something.
                // console.log("response.buyID: " + response.buyID);
                // console.log("All item IDs:");
                for (q=0;q<data.length;q++) { // loop through the array of objects
                    console.log(data[q].item_id);
                    if (data[q].item_id == response.buyID) { // look for a match between user's ID input and the item_ID of the object
                    // ^^ if you do a === match, you need to convert the user input into a number
                        
                        console.log("found a match!");
                        if (data[q].stock_quantity < response.buyQuantity) {
                            console.log("Sorry, we do not have that many in stock.");
                        } else {
                            updateQuantity = data[q].stock_quantity - response.buyQuantity;
                            console.log("updateQuantity: " + updateQuantity);
                            updateID = response.buyID;
                            console.log("updateID: " + updateID);
                            console.log("Sold! You spent $" + (response.buyQuantity * data[q].price).toFixed(2) + ".");
                            connection.query('update products set stock_quantity = ' + updateQuantity + ' where item_id = ' + updateID, function(err, data) {
                                if(err) throw err;
                                console.log("Item quantity updated.");
                                connection.end();
                                inquirer.prompt (
                                    {
                                        type: "list",
                                        message: "Would you like to keep shopping?",
                                        choices: ['Yes','No'],
                                        name: "keepShopping"
                                    }
                                ).then(function(response){
                                    if(response.keepShopping === 'Yes') {
                                        console.log("Need to add logic to re-run the prompts and query.")
                                    } else {
                                        console.log("We're all done then! Thank you and come again!");
                                    }
                                });
                            });
                            
                        }
                    } 
                }
                
            });
            
        }); // close connection.query

    }); // close connection.connect


}; // close customer()

// =============================================

// =============================================
// CALL customer() ON LOAD
customer();
// =============================================



