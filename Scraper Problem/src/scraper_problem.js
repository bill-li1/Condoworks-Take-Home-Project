/////////////////////////////////////////////////////////////
// Summary: This program uses puppeteer to navigate to a webpage,
//          login, and download a pdf located at a spcefic location.
// Author: Bill Li (billli@gmail.com)
// Date: Mar 22, 2021
/////////////////////////////////////////////////////////////

let puppeteer = require("puppeteer");
let Downloader = require("./downloader");

async function scraperCondoWorks() {
	// setting up puppeteer

	// provided URL
	let websiteUrl = "https://app-dev.condoworks.co";
	let browser = await puppeteer.launch({
		// making the window size larger so that the invoice button appears
		args: ["--window-size=1280,1024"],
		headless: true,
	});
	let page = await browser.newPage();

	// larger window size
	await page._client.send("Emulation.clearDeviceMetricsOverride");
	await page.goto(websiteUrl, { waitUntil: "networkidle2" });

	// logging in with given email and password
	await page.type("#Email", "coop.test@condoworks.co");
	await page.type("#Password", "MyTesting711");
	await Promise.all([
		page.click("#btnSubmit"),
		page.waitForNavigation({ waitUntil: "networkidle2" }),
	]);

	// navigate to the "all invoices" page
	await page.click('[role="button"], .nav-link, .dropdown-toggle');
	await Promise.all([
		page.click('[href="/invoices/all"]'),
		page.waitForNavigation({ waitUntil: "networkidle2" }),
	])
  ;
	// enter 123 into the invoice number field
	await page.type("#gs_invoices\\.InvoiceNumber", "123");

  // give time for the sorting to load
	await page.waitForTimeout(1500);

  // get information about each row
	let rowDetails = await page.evaluate(() => {
		let rows = Array.from(
			document.querySelectorAll(
        // get all rows from the table
				"#gridf8d3d3955239ee0366719690abdb63c1 tr"
			)
		);
    // the first row has all null parameters so we can ignore it
		rows.shift();
    
    // return an object containing the invoice number and row id
		let rowInfo = rows.map((row) => {
			let invoiceNumber = row.querySelector(
				'[aria-describedby*="gridf8d3d3955239ee0366719690abdb63c1_invoices.InvoiceNumber"]'
			).textContent;
			let rowId = row.id;
			return { invoiceNumber, rowId };
		});
    // returns an array of objects, each object contating two strings representing
    // the invoice number and row id
		return rowInfo;
	});
  // find row that contains invoice number 123444
	let buttonRow = "";
	for (let row of rowDetails) {
		if (row.invoiceNumber === "123444") {
			buttonRow = row.rowId;
		}
	}

  // click button located on the same row as invoice number 123444
	let buttonSelection = `[id=\"${buttonRow}\"] > td > a`;
	await Promise.all([
		page.click(buttonSelection),
		page.waitForNavigation({ waitUntil: "networkidle2" }),
	]);

  // set download behavior to download invoice pdf
	await page._client.send("Page.setDownloadBehavior", {
		behavior: "allow",
		downloadPath: "./invoices",
	});

  // download file
	await page.click(".kv-file-download");
	await page.waitForTimeout(2000);

  // printing the file location
	console.log("The path of the saved file is ./invoices");

	await browser.close();
}

scraperCondoWorks();
