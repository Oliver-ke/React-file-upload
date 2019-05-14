import React from 'react';

const Img = ({ image }) => {
	const { fileUrl, fileName } = image;
	return (
		<div style={{ height: '200px' }} className="col-4">
			<img style={{ maxWidth: '100%', height: 'auto' }} className="img-fluid" src={fileUrl} />
			<p>{fileName}</p>
		</div>
	);
};

export default Img;
