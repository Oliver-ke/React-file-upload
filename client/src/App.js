import React from 'react';
import './App.css';
import FileUploadContainer from './components/FileUploadContainer';
import ImgContainer from './components/ImgContainer';

const App = () => {
	return (
		<div className="container-flat">
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<h4 className="display-7 ">
					<i style={{ marginRight: '5px', color: '#fff' }} className="fa fa-cloud-upload-alt">
						<span style={{ marginLeft: '5px' }}>React File Upload</span>
					</i>
				</h4>
			</nav>
			<FileUploadContainer />
			<ImgContainer />
		</div>
	);
};

export default App;
