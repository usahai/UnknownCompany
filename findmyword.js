const fs = require("fs");
const path = require("path");

function* walkSync(dir) {
	const files = fs.readdirSync(dir, { withFileTypes: true });
	for (let i = 0; i < files.length; i++) {
		if (files[i].isDirectory()) {
			yield* walkSync(path.join(dir, files[i].name));
		} else {
			if (files[i].name !== "govtech.js") {
				yield path.join(dir, files[i].name);
			}
		}
	}
}

printFile = (file) =>
	new Promise((resolve, reject) => {
		let buffer = "";
		let found = false;

		var readStream = fs.createReadStream(file, "utf8");

		readStream.on("data", (chunk) => {
			const lines = buffer.concat(chunk).split(/\r?\n/);
			buffer = lines.pop();

			for (const line of lines) {
				if (line.includes("TODO")) {
					found = true;
				}
			}
		});

		readStream.on("error", (error) => reject(error));

		return readStream.on("end", () => {
			resolve(found);
		});
	});

const findmyword = async () => {
	const directories = walkSync(__dirname);

	try {
		for (let dir of directories) {
			let updated_dir = dir.replace(/\\/g, "/");

			if ((await printFile(updated_dir)) === true) {
				console.log(updated_dir);
			}
		}
	} catch (error) {
		console.log("error: ", error);
	}
};

findmyword();
