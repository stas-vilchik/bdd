import React from 'react';
import Subject from './subject.js';

export default React.createClass({
  render: function () {
    var subjectNodes = this.props.data.map((subject) => {
      return (
          <Subject key={subject.id} subject={subject} url={this.props.url} bbls={this.props.bbls}
                   onRefresh={this.props.onRefresh}>
            {subject.description}
          </Subject>
      );
    });
    return (
        <div className="list-group">
          {subjectNodes}
        </div>
    );
  }
});