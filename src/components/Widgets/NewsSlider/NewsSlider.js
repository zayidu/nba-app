import React, { Component } from 'react';
// import axios from 'axios';
import { firebase, firebaseArticles, firebaseLooper } from '../../../firebase';
import SliderTemplates from './SliderTemplates';
// import { URL } from '../../../config';

export default class NewsSlider extends Component {
  state = {
    news: [],
  };

  componentWillMount() {
    // debugger;

    firebaseArticles
      .limitToFirst(3)
      .once('value')
      .then((snapshot) => {
        // const news = [];
        // snapshot.forEach((childSnapshot) => {
        //   news.push({
        //     ...childSnapshot.val(),
        //     id: childSnapshot.key,
        //   });
        // });
        const news = firebaseLooper(snapshot);

        const asyncURLFunction = (item, index, cb) => {
          firebase
            .storage()
            .ref('images')
            .child(item.image)
            .getDownloadURL()
            .then((url) => {
              news[index].image = url;
              cb();
            });
        };
        // Promises
        let requests = news.map((item, index) => {
          return new Promise((resolve) => {
            // debugger;
            asyncURLFunction(item, index, resolve);
          });
        });

        Promise.all(requests).then(() => {
          this.setState({
            news,
          });
        });

        // Re-Renders Every time the state gets updated.
        // news.forEach((item, i) => {
        //   firebase
        //     .storage()
        //     .ref('images')
        //     .child(item.image)
        //     .getDownloadURL()
        //     .then((url) => {
        //       news[i].image = url;
        //       this.setState({
        //         news,
        //       });
        //     });
        // });

        // this.setState({
        //   news,
        // });
      });

    // axios
    //   .get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.end}`)
    //   .then((response) => {
    //     this.setState({
    //       news: response.data,
    //     });
    //   });
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
