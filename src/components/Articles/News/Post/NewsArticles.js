import React, { Component } from 'react';
import axios from 'axios';
import { URL } from '../../../../config';
import styles from '../../articles.css';
import Header from './Header';
import Body from './Body';

class NewsArticles extends Component {
  state = {
    article: [],
    team: [],
  };

  componentWillMount() {
    axios
      .get(`${URL}/articles?id=${this.props.match.params.id}`)
      .then((response) => {
        let article = response.data[0];
        axios.get(`${URL}/teams?id=${article.team}`).then((response) => {
          // console.log(response);
          this.setState({
            article,
            team: response.data,
          });
        });
      });
  }

  render() {
    // console.log(this.state);
    const article = this.state.article;
    const team = this.state.team;

    return (
      <div className={styles.articleWrapper}>
        <Header team={team[0]} date={article.date} author={article.author} />
        <Body />
      </div>
    );
  }
}

export default NewsArticles;
