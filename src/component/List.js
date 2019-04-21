import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Posts from "./Posts";
import Post from "./Post";
import NotFound from "./NotFound";
import data from "./data";

export default () => (
  <Router>
    <Switch>
      <Route exact path="/" render={routeProps => <Posts {...data} />} />
      {Object.entries(data.posts).map(([slug, post]) => (
        <Route 
          key={slug}
          exact
          path={`/${slug}`}
          render={({ match }) => <Post {...post} />}
        />
      ))}

      <Route render={routeProps => <NotFound />} />
    </Switch>
  </Router>
);