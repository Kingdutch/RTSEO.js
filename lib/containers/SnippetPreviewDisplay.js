import React from 'react';
import { connect } from 'react-redux';
import SnippetPreview from '../components/SnippetPreview';

const mapStateToProps = state => {
  return {
    title: state.paper.title,
    description: state.paper.description,
  }
};

export default connect(mapStateToProps)(SnippetPreview);
