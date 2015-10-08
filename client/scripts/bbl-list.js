import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import BBLItem from './bbl-item.js';

export default React.createClass({
  getInitialState() {
    return { list: [] };
  },

  componentDidMount() {
    this.requestData();
  },

  requestData() {
    $.when(
        this.requestBBLs(),
        this.requestSubjects()
    ).then((bblsResponse, subjectsResponse) => {
          let bbls = bblsResponse[0],
              subjects = subjectsResponse[0],
              subjectsWithExplicitBBL = subjects.map(subject => {
                return _.extend(subject, { bbl: subject.bbl == null ? '' : subject.bbl });
              }),
              subjectsByBBL = _.groupBy(subjectsWithExplicitBBL, subject => subject.bbl);
          bbls.push({ id: '' });

          let preparedBBLs = bbls.map(bbl => {
            return _.extend(bbl, { subjects: subjectsByBBL[bbl.id] || [] });
          });

          this.setState({ list: preparedBBLs, bbls: bbls });
        });
  },

  requestBBLs() {
    return $.get('/api/bbls');
  },

  requestSubjects() {
    return $.get('/api/subjects');
  },

  render() {
    let bbls = this.state.list.map(bbl => {
      return <BBLItem key={bbl.id} bbl={bbl} bbls={this.state.bbls} refresh={this.requestData}/>
    });
    return <div>{bbls}</div>;
  }
});