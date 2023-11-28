const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	image: String,
	techStach: Array,
});
const model = mongoose.model("UploadedImage", schema);
module.exports = model;
