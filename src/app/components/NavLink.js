import React from 'react';
import { Link } from 'react-router';

// export default React.createClass({
//   render() {
//     return <Link {...this.props} activeClassName="active"/>
//   }
// })

const NavLink = (props) => (
  <Link {...props} activeClassName="active" />
);

export default NavLink;