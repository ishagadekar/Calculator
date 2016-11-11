var ejs = require('ejs');

exports.calculator = function(req, res) {
	ejs.renderFile('./views/calculatorhome.ejs', function(err, result) {
		if (!err) {
			res.end(result);
		} else {
			res.end('An error occurred');
			console.log(err);
		}
	});
};

exports.calculate = function(req, res) {
	var json_response, error;
//	try {
		var expression = req.param("expression");
		
		var splitexpression = expression.match(/[^\d()]+|[\d.]+/g);
		var num1 = Number(splitexpression[0]);
		var operation = splitexpression[1];
		var num2 = Number(splitexpression[2]);
		
		if (num2 === 0) {
			json_response = {
					"result" : 0,
					"error" : "Cannot divide by zero"
				};
			res.send(json_response);
		} else if( isNaN(num2)) {
			json_response = {
					"result" : 0,
					"error" : "Invalid operation"
				};
			res.send(json_response);
		}
		var result;

		switch (operation) {
		case '/':
			result = num1 / num2;
			break;
		case '*':
			result = num1 * num2;
			break;
		case '-':
			result = num1 - num2;
			break;
		case '+':
			result = num1 + num2;
			break;
		}
		json_response = {
			"result" : result,
			"error" : 0
		};
		res.send(json_response);
	/*} catch (err) {
		console.log(err);
		json_response = {
			"result" : 0,
			"error" : err
		};
	} finally {
		res.send(json_response);
	}*/
};
