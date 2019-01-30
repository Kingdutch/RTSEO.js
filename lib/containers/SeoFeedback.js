import React from 'react';
import { connect } from 'react-redux';
import Feedback from '../components/Feedback';

const mapStateToProps = state => {
  if (typeof state.analysis[state.selectedKeyword] === "undefined") {
    return {
      results: []
    }
  }

  // TODO: Add translation to Content Analysis.
  return {
    label: 'SEO Analysis',
    results: state.analysis[state.selectedKeyword].seoAssessments
  }
};

export default connect(mapStateToProps)(Feedback);
