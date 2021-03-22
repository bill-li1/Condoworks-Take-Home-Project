let https = require("https");
let fs = require("fs");
let path = require("path");

function download(url, callback) {
	let filename = path.basename(url);
	let req = https.get(url, (res) => {
		let fileStream = fs.createWriteStream(filename);
		res.pipe(fileStream);

		fileStream.on("error", (err) => {
			console.log("Error writing to the stream.");
			console.log(err);
		});
		fileStream.on("close", () => {
			callback();
		});
		fileStream.on("finish", () => {
			fileStream.close();
		});
	});

	req.on("error", (err) => {
		console.log("Error while downloading");
		console.log(err);
	});
}

module.exports.download = download;