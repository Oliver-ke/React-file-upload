require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary');
const app = express();
const fs = require('fs');
app.use(fileUpload());

//configure cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

app.post('/upload', (req, res) => {
	if (req.files !== null) {
		const file = req.files.file;
		const path = `${__dirname}/client/public/uploads/${file.name}`;
		file.mv(path, (err) => {
			if (err) {
				return res.status(500).json(err);
			}
			cloudinary.v2.uploader.upload(path, { folder: '/uploads' }, (error, result) => {
				if (error) {
					return res.status(500).json({ msg: 'error making upload' });
				} else {
					fs.unlink(path, (err) => {
						if (err) throw err;
						res.status(201).json({ fileName: file.name, filePath: result.secure_url });
					});
				}
			});
		});
	} else {
		return res.status(400).json({ msg: 'No file upload' });
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
