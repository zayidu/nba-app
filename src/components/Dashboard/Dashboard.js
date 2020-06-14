import React, { Component } from 'react';
import styles from './dashboard.css';

import FormFields from '../Widgets/FormFields/FormFields';

export default class Dashboard extends Component {
  state = {
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
    },
  };

  updateForm(element) {
    // debugger;
    const newformData = {
      ...this.state.formData,
    };

    const newElement = {
      ...newformData[element.id],
    };

    if (element.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }
    newElement.touched = element.blur;
    newElement.value = element.event.target.value;
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
          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}
