import React from 'react';
import SubjectList from './subject-list.js'
import SubjectForm from './subject-form.js'

export default React.createClass({
  render() {
    let label = this.props.bbl.date || 'Not Planned';
    let subjectForm = this.props.bbl.id ? null : <SubjectForm onSubmit={this.props.refresh}/>;
    return (
        <div className="bbl">
          <h2>{label}</h2>
          <SubjectList data={this.props.bbl.subjects} bbls={this.props.bbls} onRefresh={this.props.refresh}/>
          {subjectForm}
        </div>
    );
  }
});