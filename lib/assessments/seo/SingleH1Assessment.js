import { assessments } from 'yoastseo';

export default class SingleH1Assessment extends assessments.seo.SingleH1Assessment {

  /**
   * Returns the score and the feedback string for the single H1 assessment.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object|null} The calculated score and the feedback string.
   */
  calculateResult( Drupal ) {
    // Returns the default assessment result if there are no H1s in the body.
    if ( this._h1s.length === 0 ) {
      return;
    }

    // Returns the default assessment result if there is one H1 and it's at the beginning of the body.
    if ( this._h1s.length === 1 && this.firstH1AtBeginning() ) {
      return;
    }

    return {
      score: this._config.scores.textContainsSuperfluousH1,
      resultText: Drupal.t("Single title: H1s should only be used as your main title. Find all H1s in your text that aren't your main title and change them to a lower heading level!"),
    };
  }
}
