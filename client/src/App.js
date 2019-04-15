import React from 'react';
import FileUpload from './components/FileUpload';
import './App.css';

const App = () => {
	return (
		<div className="container-flat">
			<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
				<h4 className="display-7 ">
					<i style={{ marginRight: '5px', color: '#fff' }} className="fa fa-cloud-upload-alt">
						<span style={{ marginLeft: '5px' }}>React File Upload</span>
					</i>
				</h4>
			</nav>
			<FileUpload />
		</div>
	);
};

export default App;
