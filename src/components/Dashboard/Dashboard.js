import React, { Component } from 'react';
import styles from './dashboard.css';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import FormFields from '../Widgets/FormFields/FormFields';
import { firebaseTeams, firebaseArticles, firebase } from '../../firebase';
import FileUploader from '../Widgets/FileUploader/FileUploader';

export default class Dashboard extends Component {
  state = {
    editorState: EditorState.createEmpty(),
    postError: '',
    loading: false,
    formData: {
      author: {
        element: 'input',
        value: '',
        config: {
          name: 'author_input',
          type: 'author',
          placeholder: 'Enter your name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      title: {
        element: 'input',
        value: '',
        config: {
          name: 'title_input',
          type: 'title',
          placeholder: 'Enter your title',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      body: {
        element: 'texteditor',
        value: '',
        valid: true,
      },
      image: {
        element: 'image',
        value: '',
        valid: true,
      },
      team: {
        element: 'select',
        value: '',
        config: {
          name: 'team_input',
          options: [],
          // placeholder: 'Enter your team',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  };

  updateForm = (element, content = '') => {
    // debugger;
    const newformData = {
      ...this.state.formData,
    };

    const newElement = {
      ...newformData[element.id],
    };

    if (content === '') {
      newElement.value = element.event.target.value;
    } else {
      newElement.value = content;
    }
    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;
    newformData[element.id] = newElement;

    this.setState({
      formData: newformData,
    });
  };
  validate = (element) => {
    let error = [true, ''];

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  submitButton = () => {
    return this.state.loading ? (
      'Loading...'
    ) : (
      <div>
        <button type="submit">Add Post</button>
      </div>
    );
  };

  submitForm = (event) => {
    // debugger;
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formData) {
      dataToSubmit[key] = this.state.formData[key].value;
    }

    for (let key in this.state.formData) {
      formIsValid = this.state.formData[key].valid && formIsValid;
    }
    // debugger;
    if (formIsValid) {
      // Submit Post
      console.log(dataToSubmit);
      this.setState({
        postError: '',
        loading: true,
      });
      // Get the Last id
      firebaseArticles
        .orderByChild('id')
        .limitToLast(1)
        .once('value')
        .then((snapshot) => {
          // firebaseArticles
          //   .orderByChild('id')
          //   // .orderByChild('team')
          //   .limitToLast(1)
          //   .once('value')
          //   .then((snapshot) => {
          let articleId = null;
          snapshot.forEach((childSnapshot) => {
            articleId = childSnapshot.val().id;
          });
          dataToSubmit['id'] = articleId + 1;
          // dataToSubmit['id'] = 0;
          dataToSubmit['date'] = firebase.database.ServerValue.TIMESTAMP;

          dataToSubmit['team'] = parseInt(dataToSubmit['team']);
          console.log(dataToSubmit);
          // debugger;
          // Post
          firebaseArticles
            .push(dataToSubmit)
            .then(
              // Posted Article is returned, then we can Redirect
              (article) => {
                this.props.history.push(`articles/${article.key}`);
              }
            )
            .catch((error) =>
              this.setState({
                postError: error.messsage,
              })
            );
        });
    } else {
      this.setState({
        postError: 'Something went wrong!',
      });
    }
  };

  showError = () => {
    return this.state.postError !== '' ? (
      <div className={styles.error}>{this.state.postError}</div>
    ) : (
      ''
    );
  };

  onEditorStateChange = (editorState) => {
    let contentState = editorState.getCurrentContent();
    let rawState = convertToRaw(contentState);
    let html = stateToHTML(contentState);
    // debugger;
    this.updateForm({ id: 'body' }, html);
    this.setState({
      editorState,
    });
  };

  componentDidMount() {
    this.loadTeam();
  }

  loadTeam = () => {
    firebaseTeams.once('value').then((snapshot) => {
      let teams = [];
      snapshot.forEach((childSnapshot) => {
        teams.push({
          id: childSnapshot.val().teamId,
          name: childSnapshot.val().city,
        });
      });

      const newformData = { ...this.state.formData };
      const newTeamsElement = { ...newformData['team'] };
      newTeamsElement.config.options = teams;
      newformData['team'] = newTeamsElement;
      this.setState({
        formData: newformData,
      });
    });
  };
  storeFileName = (filename) => {
    this.updateForm({ id: 'image' }, filename);
  };
  render() {
    return (
      <div className={styles.postContainer}>
        {/* <form onSubmit={this.submitForm.bind(this)}> */}
        <form onSubmit={this.submitForm}>
          <h2>Add Post</h2>
          <FileUploader filename={(filename) => this.storeFileName(filename)} />
          <FormFields
            id={'author'}
            formData={this.state.formData.author}
            change={(element) => this.updateForm(element)}
          />

          <FormFields
            id={'title'}
            formData={this.state.formData.title}
            change={(element) => this.updateForm(element)}
          />

          <Editor
            editorState={this.state.editorState}
            wrapperClassName="myEditor-wrapper"
            editorClassName="myEditor-editor"
            onEditorStateChange={this.onEditorStateChange}
            // onEditorStateChange={(editorState) =>
            //   this.onEditorStateChange(editorState)
            // }
          />

          <FormFields
            id={'team'}
            formData={this.state.formData.team}
            change={(element) => this.updateForm(element)}
          />

          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}
