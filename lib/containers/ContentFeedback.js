import React from 'react';
import { connect } from 'react-redux';
import Feedback from '../components/Feedback';

const mapStateToProps = state => {
  if (typeof state.analyses[state.selectedKeyword] === "undefined") {
    return {
      results: []
    }
  }

  // TODO: Add translation to Content Analysis.
  return {
    label: 'Content Analysis',
    results: state.analyses[state.selectedKeyword].contentAssessments.sort((a, b) => a.score - b.score),
  }
};

export default connect(mapStateToProps)(Feedback);
