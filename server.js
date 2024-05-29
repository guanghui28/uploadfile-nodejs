const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const filePayloadExist = require("./middleware/filePayloadExist");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post(
	"/upload",
	fileUpload({
		createParentPath: true,
	}),
	filePayloadExist,
	fileExtLimiter([".png", ".jpeg", ".jpg"]),
	fileSizeLimiter,
	(req, res) => {
		const files = req.files;

		Object.values(files).forEach((file) => {
			const uploadPath = path.join(__dirname, "imgs", file.name);

			file.mv(uploadPath, (err) => {
				if (err) {
					return res.status(500).json({
						status: "Error",
						message: "Error when saving file",
					});
				}
			});
		});

		res.json({
			status: "logged",
			message: "logged",
		});
	}
);

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
