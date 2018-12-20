import React from 'react';
import KeywordForm from './KeywordForm';
import SnippetPreview from './SnippetPreview';
import Feedback from './Feedback';

export default class AnalyserWidget extends React.Component {
  render() {
    return (
      <React.Fragment>
        <KeywordForm />
        <SnippetPreview />
        <Feedback />
      </React.Fragment>
    );
  }
}
