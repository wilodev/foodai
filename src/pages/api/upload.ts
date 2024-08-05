import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
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
	const form = formidable({
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

		const filePath = file.filepath;

		fs.readFile(filePath, (readErr, data) => {
			if (readErr) {
				console.error("Error reading the file:", readErr);
				res.status(500).json({ message: "Error reading file" });
				return;
			}

			const base64Image = data.toString("base64");
			const mimeType = file.mimetype;

			res
				.status(200)
				.json({ base64Image: `data:${mimeType};base64,${base64Image}` });
		});
	});
}
