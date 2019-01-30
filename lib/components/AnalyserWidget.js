import React from 'react';
import KeywordForm from './KeywordForm';
import SnippetPreview from './SnippetPreview';
import ContentFeedback from '../containers/ContentFeedback';
import SeoFeedback from '../containers/SeoFeedback';

export default class AnalyserWidget extends React.Component {
  render() {
    return (
      <React.Fragment>
        <KeywordForm />
        <SnippetPreview />
        <SeoFeedback />
        <ContentFeedback />
      </React.Fragment>
    );
  }
}
