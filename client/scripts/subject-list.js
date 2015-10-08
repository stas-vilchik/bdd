import React from 'react';
import Subject from './subject.js';

export default React.createClass({
  render: function () {
    var subjectNodes = this.props.data.map(function (subject) {
      return (
          <Subject key={subject.id} subject={subject} url={this.props.url} onRefresh={this.props.onRefresh}>
            {subject.description}
          </Subject>
      );
    }.bind(this));
    return (
        <div className="list-group">
          {subjectNodes}
        </div>
    );
  }
});