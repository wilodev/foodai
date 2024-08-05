import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs";

export const config = {
	api: {
		bodyParser: false,
	},
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const uploadDir = path.join(process.cwd(), "public/uploads");
	if (!fs.existsSync(uploadDir)) {
		fs.mkdirSync(uploadDir, { recursive: true });
	}

	const form = formidable({
		uploadDir,
		keepExtensions: true,
		maxFileSize: 3 * 1024 * 1024,
		multiples: false,
	});

	form.parse(req, (err, fields, files) => {
		if (err) {
			console.error("Error parsing the files:", err);
			res.status(500).json({ message: "Error uploading file" });
			return;
		}

		const file = Array.isArray(files.file) ? files.file[0] : files.file;

		if (!file) {
			res.status(400).json({ message: "File not provided" });
			return;
		}

		const filePath = file?.filepath;
		const fileName = path.basename(filePath);

		res.status(200).json({ imageUrl: `/uploads/${fileName}` });
	});
}
