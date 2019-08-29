let mysql = require('mysql');
let inquirer = require('inquirer');
// let moment = require('moment');

// a - answer
// r - response

// purchaseItem
// purchaseCount

// Question array for following inquirer
let questions = [
	{
		name: 'purchaseItem',
		type: 'input',
		message: '\nWhat is the ID of the Product you would like to purchase?'
	},
	{
		name: 'purchaseCount',
		type: 'input',
		message: '\nHow many units of that product would you like to purchase?'
	}
];

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

// ========== FUNCTIONS ==========
// Prompt title - Bamazon products for sale - $
function displayTitle() {
	inquirer
		.prompt({
			name: 'Bamazon',
			type: 'input',
			message: '\nBAMAZON - Products For Sale - $\n\n Press ENTER to view bamazon items for sale!\n'
		})
		.then(function(a) {
			if (a) {
				displayProducts();
			} else {
				connection.end();
			}
		});
}

// Display Products
// 				- (query all * - then display with loop)
function displayProducts() {
	// query the database for *** all * items being sold on Bamazon
	connection.query('SELECT * FROM products', function(err, r) {
		if (err) throw err;
		// console.log(r);

		// Display Bamazon Products
		console.log('ID   -   Product   -   Department   -  $ Price $');
		// console.log('\n________________________________________________');
		for (let i = 0; i < r.length; i++) {
			let item = r[i];
			console.log(item.id + ' - ', item.product_name + '   -   ', item.department + '  -  $', item.price);
		}

		// could display result with - console.table(r)

		// call Function to see what the user would like to bid on
		questionPrompt();
	});
}

// Prompts user asking what Product they would like to purchase, and how many
function questionPrompt() {
	connection.query('SELECT * FROM products', function(err, r) {
		if (err) throw err;
		// once you have the items, prompt the user for which they'd like to bid on

		inquirer.prompt(questions).then(function(a) {
			// console.log(`a = answers = ${JSON.stringify(a)}`);

			// Check the quantity of that purchaseCount is
			if (a.purchaseCount > r[0].stock_quantity) {
				console.log(`\nInsufficient quantity in stock, select item again and lower purchase quantity`);
				questionPrompt();
			} else {
				console.log(r[a.purchaseItem - 1].stock_quantity, ' units available');

				// function to fill user order and update our bamazon Database
				updateDB(a, r);
			}
		});
	});
}

// Fill order and update database
function updateDB(a, r) {
	// console.log('answers = ', a, '\n\nresponse = ', r);

	// Determine remaining stock at Bamazon after purchase
	let trackItem = parseInt(a.purchaseItem);
	let index = parseInt(a.purchaseItem) - 1;
	// console.log('trackItem = ', trackItem, 'index  = ', index);

	let remainingStock = r[index].stock_quantity - a.purchaseCount;
	let itemPrice = r[index].price;
	console.log('itemPrice = ', itemPrice);

	// Determine total Price for Users order - Display to User
	let totalPrice = parseInt(itemPrice) * parseInt(a.purchaseCount);
	console.log(`Your Purchase total = $ ${totalPrice}\n`);

	// UPDATE DATABASE - remove stock of item
	connection.query(
		'UPDATE products SET ? WHERE ?',
		[
			{
				stock_quantity: remainingStock
			},
			{
				id: trackItem
			}
		],
		function(err, r) {
			if (err) throw err;

			// Display affected rows
			// console.log(r.affectedRows + ' product updated');

			// Check and Display if database has updated its stock_quantity for that item ID
			readDB(trackItem);
		}
	);
}

// Query to check database is updated
function readDB(trackItem) {
	connection.query(`SELECT * FROM products WHERE id=${trackItem}`, function(err, r) {
		if (err) throw err;

		console.log(r[0].stock_quantity, ` units remaining at Bamazon-DB\n`);

		console.log('\nPurchase Complete\n');

		// Ask user if they would like to Continue shopping, or Exit Bamazon
		inquirer
			.prompt([
				{
					name: 'continue',
					type: 'list',
					message: '\nWould you like to Continue Shopping?\n',
					choices: [ 'Continue Shopping', 'Exit Bamazon' ]
				}
			])
			.then(function(a) {
				// Continue Shopping if user selects so, if not exit Bamazon Node App
				if (a.continue === 'Continue Shopping') {
					displayProducts();
				} else {
					console.log('Thank you, come again!\n');
					connection.end();
				}
			});
	});
}

// ==+   END   +==
// ==+=========+==

// console.log(`parseInt(a.purchaseCount) =+ ${parseInt(a.purchaseCount) + parseInt(a.purchaseCount)}`)
// console.log(`a.purchaseCount =+ ${a.purchaseCount + a.purchaseCount}`)
// console.log(`id=${a.purchaseItem}  and  ordernumber=${a.purchaseCount}`);

// console.log('r', JSON.stringify(r));

// Template string console log changes color of integer
// console.log(trackItem);
// console.log(remainingStock, totalPrice);
// console.log(`${remainingStock}, ${totalPrice}`);
