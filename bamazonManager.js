
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
// CREATE manager() FUNCTION
var manager = function() {
    console.log(chalk.red.bold('\n###  BOOTCAMPAZON'));
    console.log(chalk.red.bold('###  MANAGER MODE: SELECT TASK\n'));
    // get user selection for action
    inquirer.prompt([
        {
        type: "list",
        name: "manAction",
        message: "Select Task:",
        choices: [
            'View Products for Sale',
            'View Low Inventory',
            'Add to Inventory',
            'Add New Product',
            'Exit Application'
        ]
        }
    ]) // close inquirer.prompt
    .then(function(response){ // what to do after inquirer
        switch(response.manAction) {
            case 'View Products for Sale':
                viewProducts();
                break;
            case 'View Low Inventory':
                viewLowInv();
                break;
            case 'Add to Inventory':
                addInv();
                break;
            case 'Add New Product':
                addNewProd();
                break;
            case 'Exit Application':
                console.log('\nGoodbye.\n');
                connection.end();
                break;
                // TODO: why is this not exiting in to terminal
            default:
                console.log("Sorry, that is not an option.");
                connection.end();
                break;
            }
        }) // close inquirer.then()
    
}; // close manager()
// =============================================


// =============================================
// CREATE viewProducts() FUNCTION
var viewProducts = function() {
    connection.query('select * from products', function(err, data) { // get all products
        if (err) throw err;
        console.log(chalk.red.bold('\n\n###  BOOTCAMPAZON'));
        console.log(chalk.red.bold('###  MANAGER MODE: VIEW ALL PRODUCTS\n'));
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
        }
        output = table(tableData,config);
        console.log(output);
        manager();
    });
};
// =============================================


// =============================================
// CREATE viewLowInv() FUNCTION
var viewLowInv = function() {
    console.log("viewLowInv() triggered");
    connection.query('select * from products where stock_quantity < 5', function(err, data) { // get all products
        if (err) throw err;
        console.log(chalk.red.bold('\n\n###  BOOTCAMPAZON'));
        console.log(chalk.red.bold('###  MANAGER MODE: VIEW LOW INVENTORY\n'));
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
            chalk.red.bold("In Stock"),
            chalk.yellow.bold("Price")
        ]);
        if (data.length < 1) {
            console.log(chalk.green.bold("Currently there are at least five of each item in stock.\n\n"))
        } else {
            for (i=0;i<data.length;i++) {
                var newArray = [
                    data[i].item_id,
                    data[i].product_name,
                    data[i].department_name,
                    chalk.red.bold(data[i].stock_quantity),
                    "$"+data[i].price.toFixed(2)
                ];
                tableData.push(newArray);
                output = table(tableData,config);
                console.log(output);
                console.log('\n');
            }
        }
        manager();
    });
};
// =============================================


// =============================================
// CREATE addInv() FUNCTION
var addInv = function() {
    availableItems = []; // clear availableItems
    console.log("addInv() triggered");
    connection.query('select * from products', function(err, data) { // get all products
        if (err) throw err;
        console.log(chalk.red.bold('\n\n###  BOOTCAMPAZON'));
        console.log(chalk.red.bold('###  MANAGER MODE: VIEW ALL PRODUCTS\n'));
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
                message: chalk.green("Enter the Item ID of the product you would like to add to inventory."),
                name: "addID",
                validate: function (addID) {
                    if (availableItems.includes(addID)) { // make sure the itemID they input actually exists in the list of items
                        return true;
                    } else {
                        return "Please enter a valid Item ID."
                    }
                }
            },
            {
                type: "input",
                message: chalk.green("How many would you like to add to inventory?"),
                name: "addQuantity",
                validate: function (addQuantity) { // make sure the quantity entered is actually a number
                    var isValid = !isNaN(parseInt(addQuantity));
                    return isValid || "Quantity should be a number!";
                }
            }
        ]).then(function(response) {
            // update the DB to increase the inventory:
            connection.query('update products set stock_quantity = stock_quantity + ? where item_id = ?', [response.addQuantity,response.addID], function(err) {                
                if(err) throw err;
                console.log(chalk.green.bold("\nStock has been updated.\n"));
                manager();
            }); // closing connection.query for updating stock
        });
    });
};
// =============================================


// =============================================
// CREATE addNewProd() FUNCTION
// TODO: 
var addNewProd = function() {
    console.log("addNewProd() triggered");
    // need to get all the product info from the user
    inquirer.prompt([
        {
            type: "input",
            message: chalk.green("What is your product name? (Max. 50 characters)"),
            name: "newName",
            validate: function (newName) {
                if (newName.length < 51) { // make sure the itemID they input actually exists in the list of items
                    return true;
                } else {
                    return "Your product name is too long. Please limit the name to 50 characters or less."
                }
            }
        },
        {
            type: "input",
            message: chalk.green("What is the category name? (Max. 50 characters)"),
            name: "newCat",
            validate: function (newCat) {
                if (newCat.length < 51) { // make sure the itemID they input actually exists in the list of items
                    return true;
                } else {
                    return "Your category name is too long. Please limit the name to 50 characters or less."
                }
            }
        },
        {
            type: "input",
            message: chalk.green('What is the price for this item? (Input as "XXXX.XX"; do not include the dollar sign.'),
            name: "newPrice",
            // TODO: need proper validation here.
            // validate: function (newPrice) {
            //     if (newName.length < 51) { // make sure the itemID they input actually exists in the list of items
            //         return true;
            //     } else {
            //         return "Your category name is too long. Please limit the name to 50 characters or less."
            //     }
            // }
        },
        {
            type: "input",
            message: chalk.green("How many would you like to add to inventory?"),
            name: "newStock",
            validate: function (newStock) { // make sure the quantity entered is actually a number
                var isValid = !isNaN(parseInt(newStock));
                return isValid || "Quantity should be a number!";
            }
        }
    ]).then(function(response) {
        console.log("attempting to connect to DB");
        console.log(response.newName);
        console.log(response.newCat);
        console.log(response.newPrice);
        console.log(response.newStock);
        // update the DB to create the item
        connection.query('insert into products (product_name, department_name, price, stock_quantity) values (?, ?, ?, ?)', [response.newName,response.newCat,response.newPrice,response.newStock], function(err) {
        // connection.query('insert into products (product_name, department_name, price, stock_quantity) values ('+response.newName+','+response.newCat+','+response.newPrice+','+response.newStock+')', function(err) {
        // connection.query('select * from products', function(err, data) {
            if(err) throw err;
            console.log(chalk.green.bold("\nProduct has been updated.\n"));
            manager();
        }); // closing connection.query for updating stock
        // console.log(query.sql);
    });
    // then shove it all into a sql add
};
// =============================================


// =============================================
// CONNECT TO DB AND CALL manager() ON LOAD
connection.connect(function(err){
    if(err) throw err;
    manager()
});
// =============================================