import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './hoc/Layout/Layout';
import NewsArticle from './components/Articles/News/Post/NewsArticles';
import VideoArticle from './components/Articles/Videos/Video/VideoArticle';

class Routes extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/articles/:id" exact component={NewsArticle} />
          <Route path="/videos/:id" exact component={VideoArticle} />
        </Switch>
      </Layout>
    );
  }
}

export default Routes;
