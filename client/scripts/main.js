import React from 'react';
import SubjectBox from './subject-box.js';

/*
 - SubjectBox
 - SubjectList
 - Subject
 - SubjectForm

 */

React.render(
  <SubjectBox url="/api/subjects"/>,
  document.getElementById('content')
);
