import React from 'react';
import $ from 'jquery';
import Marked from 'marked';
import SubjectForm from './subject-form.js';

const URL = '/api/subjects';

export default React.createClass({
  getInitialState: function () {
    return {isModifying: false};
  },

  endModify: function() {
    this.props.onRefresh();
    this.setState({isModifying: false});
  },

  cancelModify: function () {
    this.setState({isModifying: false});
  },

  rawMarkup: function () {
    var rawMarkup = Marked(this.props.children.toString(), {sanitize: true});
    return {__html: rawMarkup};
  },

  modify: function () {
    this.setState({isModifying: true});
  },

  delete: function () {
    $.ajax({
      url: URL + '/' + this.props.subject.id,
      dataType: 'json',
      type: 'DELETE',
      success: function () {
        this.props.onRefresh();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(URL, status, err.toString());
      }.bind(this)
    });
  },

  render: function () {
    if (this.state.isModifying) {
      return (
          <div>
            <SubjectForm onSubmit={this.endModify} subject={this.props.subject} url={URL}/>
            <input type="submit" value="Cancel" onClick={this.cancelModify}/>
          </div>
      )
    } else {
      return (
          <div key={this.props.subject.id} className="subject">
            <h3 className="subjectAuthor">
              {this.props.subject.title} - {this.props.subject.author} -
              <input type="submit" value="Modify" onClick={this.modify}/> -
              <input type="submit" value="Delete" onClick={this.delete}/>
            </h3>
            <span dangerouslySetInnerHTML={this.rawMarkup()}/>
          </div>
      );
    }
  }
});