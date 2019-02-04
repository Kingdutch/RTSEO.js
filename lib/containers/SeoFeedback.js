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
    label: 'SEO Analysis',
    results: state.analyses[state.selectedKeyword].seoAssessments.sort((a, b) => a.score - b.score),
  }
};

export default connect(mapStateToProps)(Feedback);
