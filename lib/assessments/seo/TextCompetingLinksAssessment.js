import { assessments } from 'yoastseo';

export default class TextCompetingLinksAssessment extends assessments.seo.TextCompetingLinksAssessment {

  /**
   * Returns a result based on the number of links.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object} ResultObject with score and text.
   */
  calculateResult( Drupal ) {
    if ( this.linkCount.keyword.totalKeyword > this._config.parameters.recommendedMaximum ) {
      return {
        score: this._config.scores.bad,
        resultText: Drupal.t("Link keyphrase: You're linking to another page with the words that you want this page to rank for. Don't do that!"),
      };
    }
  }
}
