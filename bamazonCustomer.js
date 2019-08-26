var mysql = require('mysql');
var inquirer = require('inquirer');

// create the connection information for the sql database
var connection = mysql.createConnection({
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
	console.log('BAMAZON - Products For Sale - $');
	displayProducts();
});

function displayProducts() {
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) throw err;
		// console.log(res);
		console.log('ID   -   Product   -   Department   -  $ Price $')
		for(let i=0; i<res.length; i++){
			let item = res[i]
			console.log(item.id + "  ", item.product_name + "      ", item.department + "    ", item.price)
		}
	});
	questionPrompt();
}

// function which prompts the user for what Product they would like to purchase
function questionPrompt() {
	inquirer
		.prompt({
			type: 'input',
			name: 'customerProduct',
			message: 'What is the ID of the Product you would like to purchase?'
		},{
			type: 'input',
			name: 'purchaseCount',
			message: 'How many units of that product would you like to purchase?'
		})
		.then(function(answer) {
			console.log(answer);
// based on their answer, either call the bid or the post functions
// if (answer.customerProduct === 'POST') {
// 	postAuction();
// } else if (answer.customerProduct === 'BID') {
// 	bidAuction();
// } else {
// 	connection.end();
// }

		});
}

//   connection.end();
