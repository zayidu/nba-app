import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Layout from './hoc/Layout/Layout';
import NewsMain from './components/Articles/News/Main/NewsMain';
import VideosMain from './components/Articles/Videos/Main/VideosMain';
import NewsArticle from './components/Articles/News/Post/NewsArticles';
import VideoArticle from './components/Articles/Videos/Video/VideoArticle';
import SignIn from './components/SignIn/SignIn';
import Dashboard from './components/Dashboard/Dashboard';
import PublicRoute from './components/AuthRoutes/PublicRoute';
import PrivateRoute from './components/AuthRoutes/PrivateRoute';

const Routes = (props) => {
  console.log(props);
  return (
    <Layout user={props.user}>
      <Switch>
        <PublicRoute
          {...props}
          restricted={false}
          path="/"
          exact
          component={Home}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/news"
          exact
          component={NewsMain}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/articles/:id"
          exact
          component={NewsArticle}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/videos/:id"
          exact
          component={VideoArticle}
        />
        <PublicRoute
          {...props}
          restricted={false}
          path="/videos"
          exact
          component={VideosMain}
        />
        <PublicRoute
          {...props}
          restricted={true}
          path="/sign-in"
          exact
          component={SignIn}
        />
        <PrivateRoute
          {...props}
          path="/dashboard"
          exact
          component={Dashboard}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
