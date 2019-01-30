import { assessments } from 'yoastseo';
import inRange from 'lodash-es/inRange';

export default class KeyphraseLengthAssessment extends assessments.seo.KeyphraseLengthAssessment {

  /**
   * Calculates the result based on the keyphraseLength research.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object} Object with score and text.
   */
  calculateResult( Drupal ) {
    let score = -1;
    let resultText = '';

    if ( this._keyphraseLength < this._boundaries.recommendedMinimum ) {
      if ( this._config.isRelatedKeyphrase ) {
        score = this._config.scores.veryBad;
        resultText = Drupal.t("Keyphrase length: Set a keyphrase in order to calculate your SEO score.");
      }
      else {
        score = this._config.scores.veryBad;
        resultText = Drupal.t("Keyphrase length: No focus keyphrase was set for this page. Set a keyphrase in order to calculate your SEO score.");
      }
    }
    else if ( inRange( this._keyphraseLength, this._boundaries.recommendedMinimum, this._boundaries.recommendedMaximum + 1 ) ) {
      score = this._config.scores.good;
      resultText = Drupal.t("Keyphrase length: Good job!");
    }
    else if ( inRange( this._keyphraseLength, this._boundaries.recommendedMaximum + 1, this._boundaries.acceptableMaximum + 1 ) ) {
      score = this._config.scores.okay;
      resultText = Drupal.t(
        "Keyphrase length: The keyphrase is @count words long. That's more than the recommended maximum of @maximum words. Make it shorter!",
        {
          "@count": this._keyphraseLength,
          "@maximum": this._boundaries.recommendedMaximum,
        }
      );
    }
    else {
      score = this._config.scores.bad;
      resultText = Drupal.t(
        "Keyphrase length: The keyphrase is @count words long. That's way more than the recommended maximum of @maximum words. Make it shorter!",
        {
          "@count": this._keyphraseLength,
          "@maximum": this._boundaries.recommendedMaximum,
        }
      );
    }

    return {
      score,
      resultText,
    }
  }
}
