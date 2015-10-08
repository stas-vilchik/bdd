import React from 'react';
import $ from 'jquery';

export default React.createClass({
  handleSubmit: function (e) {
    e.preventDefault();
    var bblDate = React.findDOMNode(this.refs.bblDate).value.trim();
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify({date: bblDate}),
      contentType: 'application/json',
      success: function() {
        this.props.onSubmit();
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function () {
    return (
      <form className="bblForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Textual Date" ref="bblDate"/>
        <input type="submit" value="Create BBL"/>
      </form>
    );
  }
})
