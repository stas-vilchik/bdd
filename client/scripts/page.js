import React from 'react';
import BBLList from './bbl-list.js';

export default React.createClass({
  render() {
    return (
        <div className="container">
          <div className="jumbotron">
            <h1>BBLs Are Awesome</h1>
          </div>
          <BBLList/>
        </div>
    );
  }
});