import React, { useState } from 'react';
import Message from './Message';

import Progress from './Progress';

const FileUpload = ({ message, sendUploadRequest, uploadPercent, uploadedFIle }) => {
	const [ file, setFile ] = useState('');
	const [ fileName, setFileName ] = useState('Choose file');

	const fileInputHandler = (e) => {
		if (e.target.files) {
			setFile(e.target.files[0]);
			setFileName(e.target.files[0].name);
		}
	};
	const handleFileSubmit = (e) => {
		e.preventDefault();
		sendUploadRequest(file, fileName);
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
				{uploadedFIle.fileUrl ? (
					<div className="m-auto">
						<p className="text-center p-0 m-1">{uploadedFIle.fileName}</p>
						<img style={{ width: '100%' }} src={uploadedFIle.fileUrl} alt="uploaded img" />
					</div>
				) : (
					<div className="display-2 text-center">
						<i style={{ fontSize: '200px' }} className="fa fa-file-image" />
						<h2 style={{ fontSize: '20px' }}>No File Selected</h2>
					</div>
				)}
			</div>
		</div>
	);
};

export default FileUpload;
