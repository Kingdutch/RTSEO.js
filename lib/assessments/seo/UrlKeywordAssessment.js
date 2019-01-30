import { assessments } from 'yoastseo';

export default class UrlKeywordAssessment extends assessments.seo.UrlKeywordAssessment {

  /**
   * Determines the score and the result text based on whether or not there's a keyword in the url.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object} The object with calculated score and resultText.
   */
  calculateResult( Drupal ) {
    let score = -1;
    let resultText = '';

    if ( this._keywordInURL.keyphraseLength < 3 ) {
      if ( this._keywordInURL.percentWordMatches === 100 ) {
        score = this._config.scores.good;
        resultText = Drupal.t("Keyphrase in slug: Great work!");
      }
      else {
        score = this._config.scores.okay;
        resultText = Drupal.t("Keyphrase in slug: (Part of) your keyphrase does not appear in the slug. change that!");
      }
    }
    else if ( this._keywordInURL.percentWordMatches > 50 ) {
      score = this._config.scores.good;
      resultText = Drupal.t("Keyphrase in slug: More than half of your keypharse appears in the slug. That's great!")
    }
    else {
      score = this._config.scores.okay;
      resultText = Drupal.t("Keypharse in slug: (Part of) your keyphrase does not appear in the slug. Change that!");
    }

    return {
      score,
      resultText,
    }
  }
}
