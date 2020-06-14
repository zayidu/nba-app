import React, { Component } from 'react';
// import axios from 'axios';
// import { URL } from '../../../../config';
import {
  firebase,
  firebaseDB,
  firebaseLooper,
  firebaseTeams,
} from '../../../../firebase';
import styles from '../../articles.css';
import Header from './Header';
// import Moment from 'moment';

class NewsArticles extends Component {
  state = {
    article: [],
    team: [],
    imageURL: '',
  };
  getImageURL = (filename) => {
    // Getting the Current Article's Team Image
    // let imageURL = '';
    firebase
      .storage()
      .ref('images')
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        // imageURL = url;
        // debugger;
        this.setState({
          imageURL: url,
        });
      });
    // return imageURL;
  };
  componentWillMount() {
    firebaseDB
      .ref(`articles/${this.props.match.params.id}`)
      .once('value')
      .then((snapshot) => {
        let article = snapshot.val();
        console.log(article);
        // debugger;
        firebaseTeams
          .orderByChild('teamId')
          .equalTo(article.team)
          .once('value')
          .then((snapshot) => {
            const team = firebaseLooper(snapshot);
            // Getting the Image
            this.getImageURL(article.image);
            // debugger;
            // const imageURL = this.getImageURL(article.image);
            this.setState({
              article,
              team,
              // imageURL,
            });
          });
      });

    // axios
    //   .get(`${URL}/articles?id=${this.props.match.params.id}`)
    //   .then((response) => {
    //     let article = response.data[0];
    //     axios.get(`${URL}/teams?id=${article.team}`).then((response) => {
    //       // console.log(response);
    //       this.setState({
    //         article,
    //         team: response.data,
    //       });
    //     });
    //   });
  }

  render() {
    // console.log(this.state);
    const article = this.state.article;
    const team = this.state.team;

    return (
      <div className={styles.articleWrapper}>
        <Header team={team[0]} date={article.date} author={article.author} />
        <div className={styles.articleBody}>
          <h1>{article.title}</h1>
          <div
            className={styles.articleImage}
            style={{
              // background: `url('/images/articles/${article.image}')`
              background: `url('${this.state.imageURL}')`,
            }}
          ></div>
          <div
            className={styles.artileText}
            // Setting the HTML form WYSIWYG text that was saved in the Article
            dangerouslySetInnerHTML={{ __html: article.body }}
          >
            {/* {article.body} */}
          </div>
        </div>
      </div>
    );
  }
}

export default NewsArticles;
