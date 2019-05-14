import React, { useState } from 'react';
import FileUpload from './FileUpload';
import axios from 'axios';

const FileUploadContainer = () => {
	// do some logic
	const [ uploadedFIle, setUploadedFile ] = useState({});
	const [ message, setMessage ] = useState('');
	const [ uploadPercent, setUploadPercent ] = useState(0);

	const sendUploadRequest = async (file, fileName) => {
		setMessage('');
		setUploadedFile({});
		const formData = new FormData();
		formData.append('file', file);
		//using async await
		try {
			const res = await axios.post('/media', formData, {
				headers: {
					'Content-type': 'multipart/form-data'
				},
				onUploadProgress: (progressEvent) => {
					setUploadPercent(parseInt(Math.round(progressEvent.loaded * 100 / progressEvent.total)));
					//Clear percentage
					setTimeout(() => setUploadPercent(0), 10000);
				}
			});
			const { fileName, fileUrl } = res.data;
			setUploadedFile({ fileName, fileUrl });
			setMessage('File Uploaded Successfully');
		} catch (err) {
			const msg = err.response.data.msg || 'there was a problem with the server';
			if (err.response.status === 500) {
				setMessage(msg);
			} else if (err.response.status === 400) {
				setMessage(err.response.data.msg);
				setTimeout(() => setMessage(''), 2000);
			} else {
				setMessage(msg);
				setTimeout(() => setMessage(''), 5000);
			}
		}
	};

	return (
		<FileUpload
			uploadPercent={uploadPercent}
			message={message}
			uploadedFIle={uploadedFIle}
			sendUploadRequest={sendUploadRequest}
		/>
	);
};

export default FileUploadContainer;
