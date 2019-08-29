# Bamazon

## Bamazon is a command line Node App that makes SQL requests to a MySQL database.

## Project Use Case 
### This project goal is to create a command line store, displaying fundamental understanding of back-end SQL-Node programming. 
### Bamazon will display items for sale, determine the total purchase cost by multiplying the price of the unit selected and the quantitiy entered by the user. The database will then update, removing the purchased quantity from the in-stock quantitiy of that item located on in the MySQL database.

### Node Packages Used: 
  - **MySql.js** - Enables SQL database connection. After connected, allows us to update and read database.
  - **Inquirer** - Prompts user with questions. Used attaining better search results with less errros, and for a cleaner user experience.
  - **Nodemon.js** - Automatically restart node application when code changes.

### **[Project Link](https://github.com/thomas-white-ucf/bamazon)**

## Purchase Examples
#### Bamazon Purchase Orders
![Image1](assets/images/image1.png)

## Project deployment

1. Download full bamazon app. Located at above project link.
2. User must have current supported version of node.js installed on users computer.
3. Bamazon requires users to install several node packages as dependencies. User can accomplish this by going to Bamazon's file location in command line/terminal and entering the following command: 
    ```
    npm install
    ```
    *This will install all of the following node packages*
   - mysql
   - inquirer
   - nodemon

4. Bamazon is ready to run!  Usage instructions below..  `nodemon bamazon.js`!

## Usage Instructions

1. Go to Bamazon file location in terminal or command line. Run Bamazon with nodemon:
    ```
        nodemon bamazon.js
    ```
2. If installed correctly, once you run enter `nodemon bamazon.js`, the current items for sale will be displayed and you will be prompted with a question (*shown in picture below*). User must input the ID number of the item they would like to purchase.
3. User will then be asked to input the quantity of the item they would like to purchase.
4. Bamazon will complete the purchase if there is enough of the item in stock. If quantity entered is too high, user will be asked to enter item ID again and lower the purchase quantity.
5. Upon purchase complete, you can choose to purchse another item, or exit Bamazon

## Development Notes:
- Thomas White
- UCF Coding Bootcamp