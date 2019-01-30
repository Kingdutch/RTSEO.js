import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger';
import { Paper } from 'yoastseo';

import AnalyserWidget from "./components/AnalyserWidget";
import reducer from "./reducers";
import {analyseEntity, renderEntity} from "./actions/renderEntity";
import ContentAssessor from './assessors/ContentAssessor';
import SeoAssessor from './assessors/SEOAssessor';

import {assessPaper} from "./actions";

export default class Analyser {
  /**
   *
   * @param {Object} i18n
   *   An object that contains at least a t and formatPlural function
   *   (e.g. the global Drupal object).
   * @param {Element} keywordInput
   *   A reference to the input element that contains the keyword for this analyser.
   * @param {Element} scoreInput
   *   A reference to the input element that contains the calculated score for this analyser.
   */
  constructor(i18n, keywordInput, scoreInput) {
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

      // TODO: Move this to an event that can be subscribed to.
      // TODO: This doesn't work for multiple keywords.
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

        const seoAssessor = new SeoAssessor(i18n, {});
        const contentAssessor = new ContentAssessor(i18n, {});

        seoAssessor.assess(paper);
        contentAssessor.assess(paper);

        const seoScore = seoAssessor.calculateOverallScore();
        const seoAssessments = seoAssessor.getValidResults();

        const contentScore = contentAssessor.calculateOverallScore();
        const contentAssessments = contentAssessor.getValidResults();

        this.store.dispatch(
          assessPaper(previousKeyword, seoScore, seoAssessments, contentScore, contentAssessments)
        );
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