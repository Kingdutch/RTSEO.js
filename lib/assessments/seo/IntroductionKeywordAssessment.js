import { assessments } from 'yoastseo';

export default class IntroductionKeywordAssessment extends assessments.seo.IntroductionKeywordAssessment {

  /**
   * Returns a result based on the number of occurrences of keyphrase in the first paragraph.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object} result object with a score and translation text.
   */
  calculateResult( Drupal ) {
    let score = -1;
    let resultText = '';

    if ( this._firstParagraphMatches.foundInOneSentence ) {
      score = this._config.scores.good;
      resultText = Drupal.t("Keyphrase in introduction: Well done!");
    }
    else if ( this._firstParagraphMatches.foundInParagraph ) {
      score = this._config.scores.okay;
      resultText = Drupal.t("Keyphrase in introduction: Your keyphrase or its synonyms appear in the first paragraph of the copy, but not within one sentence. Fix that!");
    }
    else {
      score = this._config.scores.bad;
      resultText = Drupal.t("Keyphrase in introduction: Your keyphrase or its synonyms do not appear in the first paragraph. Make sure the topic is clear immediately.");
    }

    return {
      score,
      resultText
    };
  }
}
