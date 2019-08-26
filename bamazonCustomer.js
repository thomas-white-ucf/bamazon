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
	// run the start function after the connection is made to prompt the user
	start();
});

// function which prompts the user for what action they should take
function start() {
	inquirer
		.prompt({
			name: 'postOrBid',
			type: 'list',
			message: 'Would you like to [POST] an auction or [BID] on an auction?',
			choices: [ 'POST', 'BID', 'EXIT' ]
		})
		.then(function(answer) {
            console.log(answer)
			// based on their answer, either call the bid or the post functions
			// if (answer.postOrBid === 'POST') {
			// 	postAuction();
			// } else if (answer.postOrBid === 'BID') {
			// 	bidAuction();
			// } else {
			// 	connection.end();
			// }
		});
}
