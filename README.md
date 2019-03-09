# BOOTCAMPAZON


## Project Overview

BOOTCAMPAZON is a simple "storefront" ran from the command line. There is a "Customer" and "Manager" portal that can be used to buy products and update inventory.

BOOTCAMPAZON was created as a homework assignment for the UNC Chapel Hill Full Stack Web Development Bootcamp, Nov. 2018 Cohort. BOOTCAMPAZON is ran from terminal via Node.js.


## Technologies / Proficiencies

Skills/technologies incorporated into this assignment:
* Javascript
* Node.js
* MySQL
* Node Package Manager
* Mad ASCI Layout Skills

Node packages incorporated into this assignment:
* [MySQL] (https://www.npmjs.com/package/mysql)
* [Inquirer] (https://www.npmjs.com/package/inquirer)
* [Table] (https://www.npmjs.com/package/table)
* [Chalk] (https://www.npmjs.com/package/chalk)


## Customer Features

Running bootCampazon.js provides the following customer interactions:

### Inventory Display

After running the script, the inventory of the current store is displayed:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/customer1.png)

### Making a Purchase

The customer is then presented with prompts asking which product they would like to purchase, and at what quantity:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/customer1.png)

After this interaction, the customer is present with their total and an updated inventory count for the product they purchased:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/customer1.png)

Finally, the customer is asked if they would like to keep shopping. If they chose "Yes", the script re-starts be presenting the customer with the inventory list and questions about which product they would like to buy. If the customer chooses "No", then a "thank you" message is displayed:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/customer1.png)


## Customer Features

Running bootCampazonMan.js provides the following manager interactions:

### Main Menu

After first running the script, the manager is presented with five options:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/manager1.png)

After completing the steps for any given option, the manager is then presented with this same prompt.

### View Products for Sale

This option will print a table of the available products to terminal:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/manager2.png)

### View Low Inventory

This option will print a table of any product that has less than five items in stock:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/manager3.png)

### Add to Inventory

When selected, this option will also print a table of the available products:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/manager4.png)

Then the manager is asked for the item to add to inventory, and the quantity:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/manager5.png)

Once the item has been updated, as simple confirmation message is shown before re-loading the main menu:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/manager6.png)

### Add New Product

This option prompts the manager to input the name, category, price, and starting inventory for the new product:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/manager7.png)

After successfully adding the item to inventory, the following is displayed to the manager:

![Image of BOOTCAMPAZON](https://raw.githubusercontent.com/tbrandonhowell/BOOTCAMPAZON/master/images/manager8.png)

### Exit Application

Selecting this option will end the script and exit to terminal.


## BOOTCAMPAZON Setup

BOOTCAMPAZON requires node.js in order to run. Package.json is included for ease of installation for NPM packages. 

The SQL files schema.sql and seeds.sql can be utilized to create the proper database structure.


