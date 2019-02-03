import React from 'react';
import KeywordForm from './KeywordForm';
import SnippetPreviewDisplay from '../containers/SnippetPreviewDisplay';
import ContentFeedback from '../containers/ContentFeedback';
import SeoFeedback from '../containers/SeoFeedback';

export default class AnalyserWidget extends React.Component {
  render() {
    return (
      <React.Fragment>
        <KeywordForm />
        <SnippetPreviewDisplay />
        <SeoFeedback />
        <ContentFeedback />
      </React.Fragment>
    );
  }
}
