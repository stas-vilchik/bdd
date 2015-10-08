import React from 'react';
import Jquery from 'jquery';
import Marked from 'marked';

/*
 - SubjectBox
 - SubjectList
 - Subject
 - SubjectForm

 */

var data = [];
var $ = Jquery;

var SubjectBox = React.createClass({
  loadSubjectsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleSubjectSubmit: function (subject) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(subject),
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function () {
    return {data: []};
  },
  componentDidMount: function () {
    this.loadSubjectsFromServer();
  },
  render: function () {
    return (
      <div className="subjectBox">
        <h1>Subjects</h1>
        <SubjectList data={this.state.data}/>
        <SubjectForm onSubjectSubmit={this.handleSubjectSubmit}/>
      </div>
    );
  }
});

var SubjectList = React.createClass({
  render: function () {
    var subjectNodes = this.props.data.map(function (subject) {
      return (
        <Subject author={subject.author} title={subject.title}>
          {subject.text}
        </Subject>
      );
    });
    return (
      <div className="subjectList">
        {subjectNodes}
      </div>
    );
  }
});

var SubjectForm = React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var title = React.findDOMNode(this.refs.title).value.trim();
    var description = React.findDOMNode(this.refs.description).value.trim();
    if (!description || !author || !title) {
      return;
    }
    this.props.onSubjectSubmit({author: author, description: description, title: title});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.title).value = '';
    React.findDOMNode(this.refs.description).value = '';
    return;
  },
  render: function () {
    return (
      <form className="subjectForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author"/>
        <input type="text" placeholder="Title" ref="title"/>
        <input type="text" placeholder="Describe the topic you want to present" ref="description"/>
        <input type="submit" value="Post"/>
      </form>
    );
  }
});

var Subject = React.createClass({
  rawMarkup: function () {
    var rawMarkup = Marked(this.props.children.toString(), {sanitize: true});
    return {__html: rawMarkup};
  },

  render: function () {
    return (
      <div className="subject">
        <h2 className="subjectAuthor">
          {this.props.title} - {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()}/>
      </div>
    );
  }
});

React.render(
  <SubjectBox url="/api/subjects"/>,
  document.getElementById('content')
);
