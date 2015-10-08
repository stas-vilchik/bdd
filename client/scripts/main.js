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
        <SubjectList data={this.state.data} url={this.props.url} onRefresh={this.loadSubjectsFromServer}/>
        <SubjectForm url={this.props.url} onSubmit={this.loadSubjectsFromServer}/>
      </div>
    );
  }
});

var SubjectList = React.createClass({
  render: function () {
    var subjectNodes = this.props.data.map(function (subject) {
      return (
        <Subject key={subject.id} subject={subject} url={this.props.url} onRefresh={this.props.onRefresh}>
          {subject.description}
        </Subject>
      );
    }.bind(this));
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
    if (this.props.subject) {
      this.handleSubjectModify({id: this.props.subject.id, author: author, description: description, title: title});
    } else {
      this.handleSubjectCreate({author: author, description: description, title: title});
    }
    this.props.onSubmit();
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.title).value = '';
    React.findDOMNode(this.refs.description).value = '';
    return;
  },
  handleSubjectCreate: function (subject) {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(subject),
      contentType: 'application/json',
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleSubjectModify: function (subject) {
    $.ajax({
      url: this.props.url + '/' + subject.id,
      dataType: 'json',
      type: 'PUT',
      data: JSON.stringify(subject),
      contentType: 'application/json',
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    var author = this.props.subject ? this.props.subject.author : null;
    var title = this.props.subject ? this.props.subject.title : null;
    var description = this.props.subject ? this.props.subject.description : null;
    return (
      <form className="subjectForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" defaultValue={author}/>
        <input type="text" placeholder="Title" ref="title" defaultValue={title}/>
        <input type="text" placeholder="Describe the topic you want to present" ref="description"
               defaultValue={description}/>
        <input type="submit" value="Post"/>
      </form>
    );
  }
});

var Subject = React.createClass({
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
      url: this.props.url + '/' + this.props.subject.id,
      dataType: 'json',
      type: 'DELETE',
      success: function () {
        this.props.onRefresh();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function () {
    if (this.state.isModifying) {
      return (
        <div>
          <SubjectForm onSubmit={this.endModify} subject={this.props.subject} url={this.props.url}/>
          <input type="submit" value="Cancel" onClick={this.cancelModify}/>
        </div>
      )
    } else {
      return (
        <div key={this.props.subject.id} className="subject">
          <h2 className="subjectAuthor">
            {this.props.subject.title} - {this.props.subject.author} -
            <input type="submit" value="Modify" onClick={this.modify}/> -
            <input type="submit" value="Delete" onClick={this.delete}/>
          </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()}/>
        </div>
      );
    }
  }
});

React.render(
  <SubjectBox url="/api/subjects"/>,
  document.getElementById('content')
);
