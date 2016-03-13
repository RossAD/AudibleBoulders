import React from 'react'
import NavLink from '../components/NavLink'
import { Link } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>GitSpy</h1>
        <ul role="nav">
          <li><NavLink to="/create">create</NavLink></li>
          <li><NavLink to="/projects">projects</NavLink></li>
          <li><NavLink to="/" onlyActiveOnIndex>Home</NavLink></li>
        </ul>

        {/* ... */}
        {this.props.children || <Home/>}

      </div>


    )
  }
})