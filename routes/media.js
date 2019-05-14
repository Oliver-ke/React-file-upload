const router = require('express').Router();
const MediaModel = require('../Model/Media');
const cloudinary = require('cloudinary');
const fs = require('fs');
const { nameHelper } = require('../helper');

//get images from the server;
//@ /media
router.get('/', (req, res) => {
	MediaModel.find({})
		.then((images) => {
			if (images.length > 0) {
				return res.status(200).json({ images });
			} else {
				return res.json({ msg: 'no image found in database' });
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ msg: "could'nt make request to database" });
		});
});

//add files
router.post('/', (req, res) => {
	if (req.files !== null) {
		const file = req.files.file;
		file.name = nameHelper(file.name);
		console.log(__dirname);
		const path = `${__dirname}/../client/public/uploads/${file.name}`;
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
						const newFile = new MediaModel({
							fileUrl: result.secure_url,
							fileName: file.name
						});

						newFile
							.save()
							.then(() => {
								res.status(201).json({ fileName: file.name, fileUrl: result.secure_url });
							})
							.catch((err) => {
								console.log('Error saving file to db');
								res.status(500).json({ msg: 'Couldnt save img to db' });
							});
					});
				}
			});
		});
	} else {
		return res.status(400).json({ msg: 'No file upload' });
	}
});

module.exports = router;
