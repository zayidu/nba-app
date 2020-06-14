import React, { Component } from 'react';
import { firebase } from '../../../firebase';
import FileUploaderLib from 'react-firebase-file-uploader';

export default class FileUploader extends Component {
  state = {
    name: '',
    isUploading: false,
    progress: 0,
    fileURL: '',
  };
  handleUploadStart = () => {
    this.setState({
      isUploading: true,
      progress: 0,
    });
  };

  handleUploadError = (error) => {
    this.setState({
      isUploading: false,
    });
    console.log(error);
  };

  handleUploadSuccess = (filename) => {
    console.log(filename);
    this.setState({
      name: filename,
      isUploading: false,
      progress: 100,
    });
    // Getting the Image Back
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({
          fileURL: url,
        });
      });
    this.props.filename(filename);
  };

  handleProgress = (progress) => {
    this.setState({
      progress,
    });
  };

  render() {
    return (
      <div>
        <FileUploaderLib
          accept="image/*"
          name="image"
          randomizeFilename
          storageRef={firebase.storage().ref('images')}
          onUploadStart={this.handleUploadStart}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
        />
        {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
        {this.state.fileURL && (
          <img
            style={{
              width: '300px',
            }}
            src={this.state.fileURL}
            alt={this.state.fileURL}
          />
          // <img style={{ width: '300px' }} src={this.state.fileURL} />
        )}
      </div>
    );
  }
}
