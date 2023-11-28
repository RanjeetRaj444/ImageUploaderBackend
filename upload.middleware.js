const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads");
	},
	filename: (req, file, cb) => {
		let ext = path.extname(file.originalname);
		// console.log(file.originalname);
		cb(null, Date.now() + ext);
	},
});

// const upload = multer({
// 	storage: storage,
// 	fileFilter: (req, file, cb) => {
// 		if (file.mimetype === "image/png" || file.mimetype === "image/jpg") {
// 			cb(null, true);
// 		} else {
// 			console.log("Only png and jpg format supported!");
// 			cb(null, false);
// 		}
// 	},
// 	limits: {
// 		fieldSize: 1024 * 1024 * 2,
// 	},
// });
const upload = multer({
	storage: storage,
	fileFilter: (req, files, cb) => {
		cb(null, true);
	},
	limits: {
		fieldSize: 1024 * 1024 * 2,
	},
});
//completed---------
module.exports = upload;
