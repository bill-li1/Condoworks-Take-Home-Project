let fs = require("fs");
let bill = fs.readFileSync("./test-q1.txt", "utf-8");

// Global variables
let customerNumber = "NOT FOUND";
let accountNumber = "NOT FOUND";
let billPeriod = "NOT FOUND";
let billNumber = "NOT FOUND";
let billDate = "NOT FOUND";
let totalNewCharges = "NOT FOUND";

// Setting up our regex seaches for each of the required data

// regex for finding the customer number and account number
let customerAndAccountNumberRegex = /(\d{7}) - (\d{8})/gm;
let customerAndAccountNumberMatch = customerAndAccountNumberRegex.exec(bill);
if (customerAndAccountNumberMatch) {
  customerNumber = customerAndAccountNumberMatch[1];
  accountNumber = customerAndAccountNumberMatch[2];
}

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

console.log("Customer Number:", customerNumber);
console.log("Account Number:", accountNumber);
console.log("Bill Period:", billPeriod);
console.log("Bill Number:",billNumber);
console.log("Bill Date:", billDate);
console.log("totalNewCharges:", totalNewCharges);