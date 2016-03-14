import React from 'react';
import NavLink from './NavLink';
import { browserHistory } from 'react-router';

const handleSubmit = (event) => {
  event.preventDefault();
  const userName = event.target.elements[0].value;
  const repo = event.target.elements[1].value;
  const path = `/repos/${userName}/${repo}`;
  browserHistory.push(path);
};

const Projects = (props) => (
  <div>
    <h2>Repos</h2>
    <ul>
      <li><NavLink to="/repos/rackt/react-router">React Router</NavLink></li>
      <li><NavLink to="/repos/facebook/react">React</NavLink></li>
      {/* add this form */}
      <li>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="userName" /> / {' '}
          <input type="text" placeholder="repo" />{' '}
          <button type="submit">Go</button>
        </form>
      </li>
    </ul>
    {props.children}
  </div>

);

Projects.propTypes = {
  children: React.PropTypes.node,
};

export default Projects;