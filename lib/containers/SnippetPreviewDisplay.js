import React from 'react';
import { connect } from 'react-redux';
import { updateMetaTitle, updateMetaDescription } from '../actions';
import SnippetPreview from '../components/SnippetPreview';

const mapStateToProps = state => {
  return {
    title: state.paper.title,
    description: state.paper.description,
    url: state.paper.url,
  }
};

const mapDispatchToProps = ({
    updateTitle: updateMetaTitle,
    updateDescription: updateMetaDescription,
});

export default connect(mapStateToProps, mapDispatchToProps)(SnippetPreview);
