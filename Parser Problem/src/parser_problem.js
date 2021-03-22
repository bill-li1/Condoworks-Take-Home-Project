/////////////////////////////////////////////////////////////
// Summary: This program reads input from a file and parses
//          through with regular expressions to find specific
//          information about the bill.
// Author: Bill Li (billli@gmail.com)
// Date: Mar 22, 2021
// Notes: Only UTF-8 input file format supported
/////////////////////////////////////////////////////////////

let fs = require("fs");

function parseFile(filePath) {
	try {
		if (fs.existsSync(filePath)) {
			// change bill -> billContent
			let bill = fs.readFileSync(filePath, "utf-8");

			// Global variable (default value is NOT FOUND for an item that is not found
			//                  in the array)
			let customerNumber = "NOT FOUND";
			let accountNumber = "NOT FOUND";
			let billPeriod = "NOT FOUND";
			let billNumber = "NOT FOUND";
			let billDate = "NOT FOUND";
			let totalNewCharges = "NOT FOUND";

			// Setting up our regex seaches for each of the required data

			// regex for finding the customer number and account number
			let customerAndAccountNumberRegex = /(\d{7,}) - (\d{8,})/gm;
			let customerAndAccountNumberMatch = customerAndAccountNumberRegex.exec(
				bill
			);
			if (customerAndAccountNumberMatch) {
				customerNumber = customerAndAccountNumberMatch[1];
				accountNumber = customerAndAccountNumberMatch[2];
			} // add warning for if not found

			// regex for finding the bill period
			let billPeriodRegex = /(\w+ *\d{1,2},? *\d{4}) *to *(\w+ *\d{1,2},? *\d{4})/gm;
			let billPeriodMatch = billPeriodRegex.exec(bill);
			if (billPeriodMatch) {
				billPeriod = billPeriodMatch[0];
			}

			// regex for finding the bill number
			let billNumberRegex = /[Bb]ill [Nn]umber:\s?(\d+)/gm;
			let billNumberMatch = billNumberRegex.exec(bill);
			if (billNumberMatch) {
				billNumber = billNumberMatch[1];
			}

			// regex for finding the bill date
			let billDateRegex = /[Bb]ill [Dd]ate: *(\w+ *\d{1,2},? *\d{4})/gm;
			let billDateMatch = billDateRegex.exec(bill);
			if (billDateMatch) {
				billDate = billDateMatch[1];
			}

			// regex for finding total new charges
			let totalNewChargesRegex = /[Tt]otal [Nn]ew [Cc]harges *(\$[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2})/gm;
			let totalNewChargesMatch = totalNewChargesRegex.exec(bill);
			if (totalNewChargesMatch) {
				totalNewCharges = totalNewChargesMatch[1];
			}

			// output
			console.log();
			console.log("Parser results for", filePath);
			console.log("---------------------------------------");
			console.log("Customer Number:", customerNumber);
			console.log("Account Number:", accountNumber);
			console.log("Bill Period:", billPeriod);
			console.log("Bill Number:", billNumber);
			console.log("Bill Date:", billDate);
			console.log("totalNewCharges:", totalNewCharges);
		}
	} catch (err) {
		console.error("input does not exist.");
		console.log(err);
	}
}

let sampleFile = "../data/test-q1.txt";
parseFile(sampleFile);