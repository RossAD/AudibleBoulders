import React from 'react';
import NavLink from '../components/NavLink';
import Home from '../components/Home';

const App = (props) => (
  <div>
    <h1>GitSpy</h1>
    <ul role="nav">
      <li><NavLink to="/create">create</NavLink></li>
      <li><NavLink to="/projects">projects</NavLink></li>
      <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
    </ul>
    {/* ... */}
    {props.children || <Home />}
  </div>
);

App.propTypes = {
  children: React.PropTypes.node,
};

export default App;