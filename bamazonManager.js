
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
            case 'View Low Inventory':
                viewLowInv();
            case 'Add to Inventory':
                addInv();
            case 'Add New Product':
                addNewProd();
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
// TODO: 
var viewProducts = function() {
    connection.query('select * from products', function(err, data) { // get all products
        if (err) throw err;
        console.log(chalk.red.bold('\n###  BOOTCAMPAZON'));
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
// TODO: 
var viewLowInv = function() {
    console.log("viewLowInv() triggered");
};
// =============================================


// =============================================
// CREATE addInv() FUNCTION
// TODO: 
var addInv = function() {
    console.log("addInv() triggered");
};
// =============================================


// =============================================
// CREATE addNewProd() FUNCTION
// TODO: 
var addNewProd = function() {
    console.log("addNewProd() triggered");
};
// =============================================


// =============================================
// CONNECT TO DB AND CALL manager() ON LOAD
connection.connect(function(err){
    if(err) throw err;
    manager()
});
// =============================================