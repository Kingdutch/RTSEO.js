import { assessments } from 'yoastseo';

export default class SentenceLengthInTextAssessment extends assessments.readability.SentenceLengthInTextAssessment {
  /**
   * Translates the score to a message the user can understand.
   *
   * @param {number} score The score.
   * @param {number} percentage The percentage.
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {string} A string.
   */
  translateScore( score, percentage, Drupal ) {
    if ( score >= 7 ) {
      return Drupal.t("Sentence length: Great!");
    }

    return Drupal.t("Sentence length: @percentage of the sentences contain more than @word_count words, which is more than the recommended maximum of @max_percentage", {
      "@percentage": percentage + "%",
      "@word_count": this._config.recommendedWordCount,
      "@max_percentage": this._config.slightlyTooMany + "%",
    });
  }
}