const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
	const files = req.files;

	const filesOverLimit = [];

	Object.values(files).forEach((file) => {
		if (file.size > FILE_SIZE_LIMIT) {
			filesOverLimit.push(file.name);
		}
	});

	if (filesOverLimit.length) {
		const properVerb = fileSizeLimiter.length > 1 ? "are" : "is";
		const sentence =
			`Upload failed. ${fileSizeLimiter.toString()} ${properVerb} over limit size ${MB}MB`.replaceAll(
				",",
				", "
			);

		const message =
			filesOverLimit.length < 3
				? sentence.replace(",", " and")
				: sentence.replace(/,(?=[^,]*$)/, " and");

		return res.status(413).json({ status: "error", message });
	}

	next();
};

module.exports = fileSizeLimiter;
