import React, { Component } from 'react';
import styles from './videosList.css';
import axios from 'axios';
import { URL } from '../../../config';
import Button from '../Buttons/Button';
import VideosListTemplate from './VideosListTemplate';

export default class VideosList extends Component {
  state = {
    teams: [],
    videos: [],
    start: this.props.start,
    end: this.props.start + this.props.end,
    amount: this.props.end,
  };
  renderTitle(title) {
    return title ? (
      <h3>
        <strong>NBA</strong> Videos
      </h3>
    ) : null;
  }

  async componentWillMount() {
    // debugger;
    this.request(this.state.start, this.state.end);
  }

  async request(start, end) {
    if (this.state.teams.length < 1) {
      await axios.get(`${URL}/teams`).then((response) => {
        this.setState({
          teams: response.data,
        });
      });
    }
    await axios
      .get(`${URL}/videos?_start=${start}&_end=${end}`)
      .then((response) => {
        this.setState({
          videos: [...this.state.videos, ...response.data],
          start,
          end,
        });
      });
  }
  loadmore() {
    let end = this.state.end + this.state.amount;
    this.request(this.state.end, end);
  }

  renderButton(loadmore) {
    return loadmore ? (
      <Button
        type="loadmore"
        loadmore={() => this.loadmore()}
        cta="Load More Videos"
      />
    ) : (
      <Button type="linkTo" cta="More Videos" linkTo="/videos" />
    );
  }
  renderVideos() {
    let template = null;
    switch (this.props.type) {
      case 'card':
        template = (
          <VideosListTemplate
            data={this.state.videos}
            teams={this.state.teams}
          />
        );
        break;
      default:
        template = null;
    }
    return template;
  }

  render() {
    return (
      <div className={styles.videoList_wrapper}>
        {this.renderTitle(this.props.title)}
        {this.renderVideos()}
        {this.renderButton(this.props.loadmore)}
      </div>
    );
  }
}
