import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Create from './components/Create';
import Home from './components/Home';
import Project from './components/Project';
import Projects from './components/Projects';

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/projects" component={Projects}>
      <Route path="/projects/:userName/:repoName" component={Project} />
    </Route>
    <Route path="/create" component={Create} />
  </Route>
);