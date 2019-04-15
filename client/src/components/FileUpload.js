import React, { Fragment, useState } from 'react';
import Message from './Message';
import axios from 'axios';
import Progress from './Progress';

const FileUpload = () => {
	const [ file, setFile ] = useState('');
	const [ fileName, setFileName ] = useState('Choose file');
	const [ uploadedFIle, setUploadedFile ] = useState({});
	const [ message, setMessage ] = useState('');
	const [ uploadPercent, setUploadPercent ] = useState(0);

	const fileInputHandler = (e) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
			setFileName(e.target.files[0].name);
		}
	};
	const handleFileSubmit = async (e) => {
		e.preventDefault();
		setMessage('');
		setUploadedFile({});
		const formData = new FormData();
		formData.append('file', file);
		//using async await
		try {
			const res = await axios.post('/upload', formData, {
				headers: {
					'Content-type': 'multipart/form-data'
				},
				onUploadProgress: (progressEvent) => {
					setUploadPercent(parseInt(Math.round(progressEvent.loaded * 100 / progressEvent.total)));
					//Clear percentage
					setTimeout(() => setUploadPercent(0), 10000);
				}
			});
			const { fileName, filePath } = res.data;
			setUploadedFile({ fileName, filePath });
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
		<div className="row m-4">
			{message ? (
				<div className="col-md-12">
					<Message msg={message} />
				</div>
			) : null}
			<div className="col-md-6 mt-5">
				<form onSubmit={handleFileSubmit}>
					<div className="custom-file mb-2">
						<input type="file" className="custom-file-input" id="customFile" onChange={fileInputHandler} />
						<label style={{ color: '#000' }} className="custom-file-label" htmlFor="customFile ">
							{fileName}
						</label>
					</div>
					<Progress percentage={uploadPercent} />
					<input type="submit" disabled={!file} value="Upload" className="btn btn-primary btn-block mt-3" />
				</form>
			</div>
			<div className="col-md-6 mt-5">
				{uploadedFIle.filePath ? (
					<div className="m-auto">
						<p className="text-center p-0 m-1">{uploadedFIle.fileName}</p>
						<img style={{ width: '100%' }} src={uploadedFIle.filePath} alt="uploaded img" />
					</div>
				) : (
					<h4 className="display-2 text-center">
						<i style={{ fontSize: '200px' }} className="fa fa-file-image" />
						<h2 style={{ fontSize: '20px' }}>No File Selected</h2>
					</h4>
				)}
			</div>
		</div>
	);
};

export default FileUpload;
