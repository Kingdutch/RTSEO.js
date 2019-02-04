import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from 'redux-logger';
import { Paper } from 'yoastseo';

import AnalyserWidget from "./components/AnalyserWidget";
import EventEmitter from "./helpers/EventEmitter";
import reducer from "./reducers";
import {analyseEntity, renderEntity} from "./actions/renderEntity";
import ContentAssessor from './assessors/ContentAssessor';
import SeoAssessor from './assessors/SEOAssessor';

import {assessPaper} from "./actions";

export default class Analyser extends EventEmitter {
  /**
   *
   * @param {Object} i18n
   *   An object that contains at least a t and formatPlural function
   *   (e.g. the global Drupal object).
   * @param {URL} base_url
   *   The base URL for this website to display before entity paths.
   */
  // TODO: Replace these variables with a configuration object so we can add configurable social media in the future. The config can also seed initial inputs/scores.
  // TODO: Use the configuration options to make title/description editing optional.
  constructor(i18n, base_url) {
    super();

    this.base_url = base_url;

    // Create a new redux store for this analyser so we can use multiple
    // analysers on the same page.
    this.store = createStore(
      reducer,
      applyMiddleware(logger) /**/
    );

    // Keep track of our store subscriptions.
    this.storeSubscriptions = [];

    let previousKeyword = null;
    let previousPaper = {};

    // Analyse the paper when it or the keyword changes.
    this.storeSubscriptions.push(
      this.store.subscribe(() => {
        const state = this.store.getState();

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
      })
    );

    let previousAnalyses = [];

    // Update our listeners when keywords or scores are changed. As an example
    // this allows Drupal to update its form fields to store the results.
    this.storeSubscriptions.push(
      this.store.subscribe(() => {
        const state = this.store.getState();

        if (state.analyses !== previousAnalyses) {
          let results = Object.keys(state.analyses).reduce((acc, keyword) => {
            acc[keyword] = {
              contentScore: state.analyses[keyword].contentScore,
              seoScore: state.analyses[keyword].seoScore,
            };
            return acc;
          }, {});

          this.emit('resultsUpdated', results);

          previousAnalyses = state.analyses;
        }
      })
    );
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
        <AnalyserWidget baseUrl={this.base_url} />
      </Provider>,
      target
    );
  }

  /**
   * Cleans up any listeners such as the Redux store subscription.
   */
  cleanup() {
    for (let i=0, j = this.storeSubscriptions.length; i < j; ++i) {
      // Remove the subscription from the array and call it to unsubscribe.
      this.storeSubscriptions.pop()();
    }
  }
}