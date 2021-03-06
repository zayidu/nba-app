import React, { Component } from 'react';
// import axios from 'axios';
// import { URL } from '../../../../config';
import {
  firebaseDB,
  firebaseTeams,
  firebaseLooper,
  firebaseVideos,
} from '../../../../firebase';
import styles from '../../articles.css';
import Header from './Header';

import VideosRelated from '../../../Widgets/VideosList/VideosRelated/VideosRelated';

export default class VideoArticle extends Component {
  state = {
    article: [],
    team: [],
    teams: [],
    related: [],
  };

  componentWillMount() {
    firebaseDB
      .ref(`videos/${this.props.match.params.id}`)
      .once('value')
      .then((snapshot) => {
        let article = snapshot.val();
        console.log(article);
        firebaseTeams
          .orderByChild('teamId')
          .equalTo(article.team)
          .once('value')
          .then((snapshot) => {
            const team = firebaseLooper(snapshot);

            this.setState({
              article,
              team,
            });
            this.getRelated();
          });
      });
    // axios
    //   .get(`${URL}/videos?id=${this.props.match.params.id}`)
    //   .then((response) => {
    //     let article = response.data[0];
    //     axios.get(`${URL}/teams?id=${article.team}`).then((response) => {
    //       // console.log(response);
    //       this.setState({
    //         article,
    //         team: response.data,
    //       });
    //       this.getRelated();
    //     });
    //   });
  }

  getRelated() {
    firebaseTeams.once('value').then((snapshot) => {
      let teams = firebaseLooper(snapshot);

      firebaseVideos
        .orderByChild('team')
        .equalTo(this.state.article.team)
        .limitToFirst(3)
        .once('value')
        .then((snapshot) => {
          const related = firebaseLooper(snapshot);
          this.setState({
            teams,
            related,
          });
        });
    });

    // axios.get(`${URL}/teams`).then((response) => {
    //   let teams = response.data;
    //   axios
    //     .get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
    //     .then((response) => {
    //       this.setState({
    //         teams,
    //         related: response.data,
    //       });
    //     });
    // });
  }

  render() {
    const article = this.state.article;
    const team = this.state.team;
    const teams = this.state.teams;
    const related = this.state.related;
    console.log(teams, related);

    return (
      <div>
        <Header teamData={team[0]} />
        <div className={styles.videoWrapper}>
          <h1>{article.title}</h1>
          <iframe
            title="videoplayer"
            width="100%"
            height="300px"
            src={`https://www.youtube.com/embed/${article.url}`}
          ></iframe>
        </div>
        <VideosRelated data={related} teams={teams} />
      </div>
    );
  }
}
