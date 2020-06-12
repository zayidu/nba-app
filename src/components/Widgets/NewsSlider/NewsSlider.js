import React, { Component } from 'react';
import axios from 'axios';
import SliderTemplates from './SliderTemplates';
import { URL } from '../../../config';

export default class NewsSlider extends Component {
  state = {
    news: [],
  };

  componentWillMount() {
    // debugger;
    axios
      .get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.end}`)
      .then((response) => {
        this.setState({
          news: response.data,
        });
      });
  }

  render() {
    // console.log(this.state.news);
    return (
      <div>
        <SliderTemplates
          data={this.state.news}
          type={this.props.type}
          settings={this.props.settings}
        />
      </div>
    );
  }
}
