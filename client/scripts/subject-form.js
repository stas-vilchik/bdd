import React from 'react';
import $ from 'jquery';
import Marked from 'marked';

const URL = '/api/subjects';

export default React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    if (!description || !author || !title) {
      return;
    }
    if (this.props.subject) {
      this.handleSubjectModify({ id: this.props.subject.id, author: author, description: description, title: title });
    } else {
      this.handleSubjectCreate({ author: author, description: description, title: title });
    }
    this.props.onSubmit();
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.title).value = '';
    React.findDOMNode(this.refs.description).value = '';
  },
  handleSubjectCreate: function (subject) {
    $.ajax({
      url: URL,
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(subject),
      contentType: 'application/json',
      error: function (xhr, status, err) {
        console.error(URL, status, err.toString());
      }.bind(this)
    });
  },
  handleSubjectModify: function (subject) {
    $.ajax({
      url: URL + '/' + subject.id,
      dataType: 'json',
      type: 'PUT',
      data: JSON.stringify(subject),
      contentType: 'application/json',
      error: function (xhr, status, err) {
        console.error(URL, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    var author = this.props.subject ? this.props.subject.author : null;
    var title = this.props.subject ? this.props.subject.title : null;
    var description = this.props.subject ? this.props.subject.description : null;
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="form-author">Your Name</label>
            <input className="form-control" id="form-author" type="text" ref="author" defaultValue={author}/>
          </div>
          <div className="form-group">
            <label htmlFor="form-title">Title</label>
            <input className="form-control" id="form-title" type="text" ref="title" defaultValue={title}/>
          </div>
          <div className="form-group">
            <label htmlFor="form-description">Description</label>
            <textarea className="form-control" id="form-description" type="text"
                      placeholder="Describe the topic you want to present" ref="description"
                      defaultValue={description}/>
          </div>
          <input className="btn btn-primary" type="submit" value="Post"/>
        </form>
    );
  }
});