let mysql = require('mysql');
let inquirer = require('inquirer');
// let moment = require('moment');

// create the connection information for the sql database
let connection = mysql.createConnection({
	host: 'localhost',

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: 'SQLsetpass774$',
	database: 'bamazon_DB'
});

// connect to the mysql server and sql database
connection.connect(function(err) {
	if (err) throw err;
	// run the display function after the connection is made to prompt the user with the available inventory
	displayTitle();
});

// Prompt title - Bamazon products for sale - $
function displayTitle() {
	inquirer
		.prompt({
			name: 'q1',
			type: 'input',
			message: '\nBAMAZON - Products For Sale - $\n\n Press ENTER to display products!'
		})
		.then(function(answers) {
			displayProducts();
		});
}

function displayProducts() {
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) throw err;
		// console.log(res);
		// console.table(res);

		console.log('ID   -   Product   -   Department   -  $ Price $');
		for (let i = 0; i < res.length; i++) {
			let item = res[i];
			console.log(item.id + ' - ', item.product_name + '   -   ', item.department + '  -  $', item.price);
		}
		questionPrompt();
	});
}

// Question array for following inquirer
let questions = [
	{
		name: 'customerProduct',
		type: 'input',
		message: '\nWhat is the ID of the Product you would like to purchase?'
	},
	{
		name: 'customerCount',
		type: 'input',
		message: '\nHow many units of that product would you like to purchase?'
	}
];

// function which prompts the user for what Product they would like to purchase
function questionPrompt() {
	inquirer.prompt(questions).then(function(answers) {
		// console.log(`id=${answers.customerProduct}  and  ordernumber=${answers.customerCount}`);

		// based on customer input for product ID, check the quantity of that product
		connection.query(`SELECT * FROM products WHERE id=${answers.customerProduct}`, function(err, res) {
			if (err) throw err;

			// Check if quantity in stock is less than demanded by customer
			if (answers.customerCount > res[0].stock_quantity) {
				console.log(`Insufficient quantity!`);
			} else {
				console.log(res[0].stock_quantity, 'units available');
			}
		});

		// else {
		// 	connection.end();
		// }
	});
}
