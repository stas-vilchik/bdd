import React from 'react';
import $ from 'jquery';
import SubjectList from './subject-list.js';
import SubjectForm from './subject-form.js';
import BblForm from './bbl-form.js';

export default React.createClass({
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
        <BblForm url='api/bbls' onSubmit={this.loadSubjectsFromServer}/>
      </div>
    );
  }
});