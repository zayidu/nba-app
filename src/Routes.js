import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './hoc/Layout/Layout';
import NewsMain from './components/Articles/News/Main/NewsMain';
import VideosMain from './components/Articles/Videos/Main/VideosMain';
import NewsArticle from './components/Articles/News/Post/NewsArticles';
import VideoArticle from './components/Articles/Videos/Video/VideoArticle';
import SignIn from './components/SignIn/SignIn';

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/news" exact component={NewsMain} />
          <Route path="/articles/:id" exact component={NewsArticle} />
          <Route path="/videos/:id" exact component={VideoArticle} />
          <Route path="/videos" exact component={VideosMain} />
          <Route path="/sign-in" exact component={SignIn} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
