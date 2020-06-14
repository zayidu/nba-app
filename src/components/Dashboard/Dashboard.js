import React, { Component } from 'react';
import styles from './dashboard.css';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import FormFields from '../Widgets/FormFields/FormFields';
import { firebaseTeams } from '../../firebase';

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
          placeholder: 'Enter your author',
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
      teams: {
        element: 'select',
        value: [],
        config: {
          name: 'teams_input',
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

  updateForm(element, content = '') {
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
  }
  validate(element) {
    let error = [true, ''];

    if (element.validation.required) {
      const valid = element.value.trim() !== '';
      const message = `${!valid ? 'This field is required' : ''}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  }

  submitButton() {
    return this.state.loading ? (
      'Loading...'
    ) : (
      <div>
        <button type="submit">Add Post</button>
      </div>
    );
  }

  submitForm(event) {
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

    if (formIsValid) {
      // Submit Post
      console.log(dataToSubmit);
    } else {
      this.setState({
        postError: 'Something went wrong!',
      });
    }
  }

  showError() {
    return this.state.postError !== '' ? (
      <div className={styles.error}>{this.state.postError}</div>
    ) : (
      ''
    );
  }

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
    this.loadTeams();
  }

  loadTeams = () => {
    firebaseTeams.once('value').then((snapshot) => {
      let teams = [];
      snapshot.forEach((childSnapshot) => {
        teams.push({
          id: childSnapshot.val().teamId,
          name: childSnapshot.val().city,
        });
      });

      const newformData = { ...this.state.formData };
      const newTeamsElement = { ...newformData['teams'] };
      newTeamsElement.config.options = teams;
      newformData['teams'] = newTeamsElement;
      this.setState({
        formData: newformData,
      });
    });
  };

  render() {
    return (
      <div className={styles.postContainer}>
        <form onSubmit={this.submitForm.bind(this)}>
          <h2>Add Post</h2>
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
            id={'teams'}
            formData={this.state.formData.teams}
            change={(element) => this.updateForm(element)}
          />

          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}
