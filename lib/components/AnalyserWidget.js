import React from 'react';
import KeywordForm from './KeywordForm';
import SnippetPreviewDisplay from '../containers/SnippetPreviewDisplay';
import ContentFeedback from '../containers/ContentFeedback';
import SeoFeedback from '../containers/SeoFeedback';

export default function AnalyserWidget(props) {
  return (
    <React.Fragment>
      <KeywordForm />
      <SnippetPreviewDisplay {...props} />
      <SeoFeedback />
      <ContentFeedback />
    </React.Fragment>
  );
}
