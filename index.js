const express = require("express");
const mongoose = require("mongoose");
const model = require("./mongoose.model");
const upload = require("./upload.middleware");
const corse = require("cors");
require("dotenv").config();

const app = express();
app.use(corse());
app.use(express.json());

const cpUpload = upload.fields([
	{ name: "imagehihi", maxCount: 1 },
	{ name: "techStach", maxCount: 8 },
]);

app.post("/", cpUpload, async (req, res) => {
	console.log(req.files);
	const data = {};
	if (req.files.techStach) {
		let path = "";
		req.files.techStach.forEach(function (files, index, arr) {
			path = path + files.path + ",";
		});
		path = path.substring(0, path.lastIndexOf(","));
		// console.log(path);
		data.techStach = path.split(",");
	}
	if (req.files.imagehihi) data.image = req.files.imagehihi[0].path;
	try {
		const uploadeImage = await model.create(data);
		res.status(200).send(uploadeImage);
	} catch (err) {
		res.status(500).send({ error: err.message, message: "somemmmmmmmm" });
	}
});

app.use("/uploads", express.static("uploads"));
app.get("/images", async (req, res) => {
	try {
		const data = await model.find();
		res.status(200).send({ image: data });
	} catch (err) {
		res.status(500).send({ error: err.message, message: "somemmmmmmmm" });
	}
});
app.listen(process.env.PORT, async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
		console.log("database is connected.");
	} catch (err) {
		console.log({ error: err.message });
	}
	console.log("app is listening on port", process.env.PORT);
});

//lets try
