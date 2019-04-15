import React, { Fragment } from 'react';

const FileUpload = () => {
	return (
		<Fragment>
			<div className="custom-file">
				<input type="file" className="custom-file-input" id="customFile" />
				<label className="custom-file-label" for="customFile">
					Choose file
				</label>
				<input type="submit" value="Upload" className="btn btn-primary btn-block" />
			</div>
		</Fragment>
	);
};

export default FileUpload;
