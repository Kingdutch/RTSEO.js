import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import AnalyserWidget from "./components/AnalyserWidget";
import reducer from "./reducers";
import {analyseEntity, renderEntity} from "./actions/renderEntity";
import { Paper, Researcher } from 'yoastseo';
import logger from 'redux-logger';

import { ContentAssessor, SeoAssessor } from 'yoastseo';

const contentAssessments = [
  'fleschReadingEase',
  'subheadingsTooLong',
  'textParagraphTooLong',
  'textSentenceLength',
  'textTransitionWords',
  'passiveVoice',
  'textPresence',
  'sentenceBeginnings',
  // Temporarily disabled: 'wordComplexity',
];

const seoAssessments = [
  'introductionKeyword',
  'keyphraseLength',
  'keywordDensity',
  'metaDescriptionKeyword',
  'metaDescriptionLength',
  'subheadingsKeyword',
  'textCompetingLinks',
  'textImages',
  'textLength',
  'externalLinks',
  'titleKeyword',
  'internalLinks',
  'titleWidth',
  'urlKeyword',
  'urlLength',
  'urlStopWords',
  'functionWordsInKeyphrase',
];

export default class Analyser {
  /**
   *
   * @param keywordInput DOMElement
   *   A reference to the input element that contains the keyword for this analyser.
   * @param scoreInput DOMElement
   *   A reference to the input element that contains the calculated score for this analyser.
   */
  constructor(keywordInput, scoreInput) {
    // Create a new redux store for this analyser so we can use multiple
    // analysers on the same page.
    this.store = createStore(
      reducer,
      applyMiddleware(logger) /**/
    );

    this.keywordInput = keywordInput;
    this.scoreInput = scoreInput;

    let previousKeyword = null;
    let previousPaper = {};

    // Handle React store updates.
    this.unsubscribeToStore = this.store.subscribe(() => {
      const state = this.store.getState();

      // Ensures that values that change in the store are propagated to DOM
      // input elements that can be processed by Drupal.
      this.keywordInput.value = state.keyword;
      this.scoreInput.value = state.score;

      // Only re-analyse if underlying data has changed.
      if (state.paper !== previousPaper || state.selectedKeyword !== previousKeyword) {
        previousPaper = state.paper;
        previousKeyword = state.selectedKeyword;

        const paper = new Paper( previousPaper.text, {
          keyword: previousKeyword,
          ...previousPaper
        });

        const researcher = new Researcher( paper );

        const seoAssessor = new SeoAssessor({}, {});
        const contentAssessor = new ContentAssessor({});


        console.log(researcher.getResearch(contentAssessments[0]));
      }
    });
  }

  /**
   * Dispatches a render entity event in the redux store.
   *
   * @param fetch function
   *   A function that actually retrieves the data.
   */
  renderEntity(fetch) {
    this.store.dispatch(renderEntity());
    fetch();
  }

  /**
   * Updates the data in the store and dispatches analysis.
   *
   * @param data object
   *   The data to analyse.
   */
  analyse(data) {
    this.store.dispatch(
      analyseEntity(data)
    );
  }

  /**
   * Renders the user interface.
   *
   * @param target DOMElement
   *   The DOM element to use as parent for the UI.
   */
  render(target) {
    ReactDOM.render(
      <Provider store={this.store}>
        <AnalyserWidget />
      </Provider>,
      target
    );
  }

  /**
   * Cleans up any listeners such as the Redux store subscription.
   */
  cleanup() {
    this.unsubscribeToStore();
  }
}