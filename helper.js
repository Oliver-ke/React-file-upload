const nameHelper = (fileName) => {
	const moment = new Date();
	let date = moment.toLocaleDateString();
	let time = moment.toLocaleTimeString();
	let formatedDate = date.replace('/', '').replace('/', '');
	let formatedTime = time.replace('AM', '').replace('PM', '').replace(':', '').replace(':', '');
	let mimeType = fileName.slice(fileName.lastIndexOf('.') + 1);
	return `image_${formatedDate}${formatedTime}.${mimeType}`;
};

module.exports = {
	nameHelper
};
