
// =============================================
// NPM PACKAGES
const mysql = require("mysql");
const inquirer = require("inquirer");
const {table} = require('table');
// ^^ not sure why this works but the normal require doesn't
const chalk = require('chalk');
// =============================================


// =============================================
// GLOBALS
var updateQuantity;
var availableItems = [];
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
// CREATE customer() FUNCTION
var customer = function() {
    // clear availableItems[]:
    availableItems = [];
    // run our query
    connection.query('select * from products', function(err, data) {
        if (err) throw err;
        console.log(chalk.red.bold("\n============================================="));
        console.log(chalk.red.bold("||           BUY FROM BOOTCAMPAZON         ||"));
        console.log(chalk.red.bold("=============================================\n"));
        // display the data w/ table package
        let output;
        let tableData = [];
        config = {
            columns: {
                0: {
                    alignment: 'left',
                },
                1: {
                    alignment: 'left',
                },
                2: {
                    alignment: 'left',
                },
                3: {
                    alignment: 'left',
                },
                4: {
                    alignment: 'right',
                }
            }
        };
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
                "$"+data[i].price.toFixed(2)
            ];
            tableData.push(newArray);
            // add all the item numbers into a separate, easily searchable array for user input validation purposes
            availableItems.push(data[i].item_id);
        }
        output = table(tableData,config);
        console.log(output);
        // get user input for item and quantity to purchase
        inquirer.prompt([
            {
                type: "number",
                message: chalk.green("Enter the Item ID of the product you would like to purchase."),
                name: "buyID",
                validate: function (buyID) {
                    if (availableItems.includes(buyID)) { // make sure the itemID they input actually exists in the list of items
                        return true;
                    } else {
                        return "Please enter a valid Item ID."
                    }
                }
            },
            {
                type: "input",
                message: chalk.green("How many would you like to purchase?"),
                name: "buyQuantity",
                validate: function (buyQuantity) { // make sure the quantity entered is actually a number
                    var isValid = !isNaN(parseInt(buyQuantity));
                    return isValid || "Quantity should be a number!";
                }
            }
        ]).then(function(response) {
            // is there enough stock?
            for (q=0;q<data.length;q++) { // loop through the array of objects
                if (data[q].item_id == response.buyID) { // look for a match between user's ID input and the item_ID of the object
                // ^^ if you do a === match, you need to convert the user input into a number
                    if (data[q].stock_quantity < response.buyQuantity) { // if stock is too low, display this message:
                        console.log("\nSorry, we do not have that many in stock.\n");
                        inquirer.prompt (
                            {
                                type: "list",
                                message: "Would you like to keep shopping?",
                                choices: ['Yes','No'],
                                name: "keepShopping"
                            }
                        ).then(function(response){
                            if(response.keepShopping === 'Yes') {
                                // relaunch customer()
                                customer();
                            } else {
                                connection.end();
                                console.log("\nWe're all done then! Thank you and come again!\n");
                            }
                        });
                    } else { // otherwise, we assume we have enough stock and proceed.
                        updateQuantity = data[q].stock_quantity - response.buyQuantity; // what the new quantity should be for this item after the purchase
                        // confirm to the user:
                        console.log("\nSold! You spent $" + (response.buyQuantity * data[q].price).toFixed(2) + ".");
                        console.log("\nThere are " + updateQuantity + " of this item left for purchase.\n")
                        // update the DB to decrement the inventory:
                        connection.query('update products set stock_quantity = ? where item_id = ?', [updateQuantity,response.buyID], function(err) {
                            if(err) throw err;
                            inquirer.prompt (
                                {
                                    type: "list",
                                    message: "Would you like to keep shopping?",
                                    choices: ['Yes','No'],
                                    name: "keepShopping"
                                }
                            ).then(function(response){
                                if(response.keepShopping === 'Yes') {
                                    // relaunch customer()
                                    customer();
                                } else {
                                    connection.end();
                                    console.log("\nWe're all done then! Thank you and come again!\n");
                                }
                            });
                        }); // closing connection.query for updating stock
                    }
                } 
            }
        });
    }); // close connection.query (select * from products)
}; // close customer()
// =============================================


// =============================================
// CONNECT TO DB AND CALL customer() ON LOAD
connection.connect(function(err){
    if(err) throw err;
    customer()
});
// =============================================



