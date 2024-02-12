import React from 'react';
import { Link } from 'react-router-dom';

const Component404 = () => {
  return (
    <div className="App">
      <h1>404 Not Found! Please check your URL</h1>
      <Link to='/'>Home Page</Link>
    </div>
  );
}

export default Component404;
