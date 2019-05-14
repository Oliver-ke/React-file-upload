import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Img from './Img';
const ImgContainer = ({ imgChange }) => {
	const [ images, setImages ] = useState([]);

	useEffect(() => {
		const getImages = async () => {
			try {
				const res = await axios.get('/media');
				setImages(res.data.images);
			} catch (error) {
				console.log('Error making request');
			}
		};
		getImages();
	}, []);
	return (
		<div className="container">
			<div className="row">
				{images.length > 0 ? (
					images.map((img) => {
						console.log(img);
						return <Img image={img} key={img._id} />;
					})
				) : (
					<h1>You have no img to display</h1>
				)}
			</div>
		</div>
	);
};

export default ImgContainer;
