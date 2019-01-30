import { assessments, helpers } from 'yoastseo';

const { inRange } = helpers;

export default class SubheadingDistributionTooLongAssessment extends assessments.readability.SubheadingDistributionTooLongAssessment {
  /**
   * Calculates the score and creates a feedback string based on the subheading texts length.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object} The calculated result.
   */
  calculateResult( Drupal ) {
    let score = -1;
    let resultText = '';

    if ( this._textLength <= 300 ) {
      if ( this._hasSubheadings ) {
        // Green indicator.
        resultText = Drupal.t("Subheading distribution: Great job!");
        score = this._config.scores.goodSubheadings;
      }
      else {
        // Green indicator.
        resultText = Drupal.t("Subheading distribution: You are not using any subheadings, but your text is short enough and probably doesn't need them.");
        score = this._config.scores.goodShortTextNoSubheadings;
      }
    }
    else if ( this._hasSubheadings ) {
      const longestSubheadingTextLength = this._subheadingTextsLength[ 0 ].wordCount;
      if ( longestSubheadingTextLength <= this._config.parameters.slightlyTooMany ) {
        // Green indicator.
        resultText = Drupal.t("Subheading distribution: Great job!");
        score = this._config.scores.goodSubheadings;
      }
      else if ( inRange( longestSubheadingTextLength, this._config.parameters.slightlyTooMany, this._config.parameters.farTooMany ) ) {
        // Orange indicator.
        resultText = Drupal.formatPlural(
          this._tooLongTextsNumber,
          "Subheading distribution: @section_count section of your text is no longer than @word_count words and is not separated by any subheadings. Add subheadings to improve readability.",
          "Subheading distribution: @section_count sections of your text is no longer than @word_count words and is not separated by any subheadings. Add subheadings to improve readability.",
          {
            "@section_count": this._tooLongTextsNumber,
            "@word_count": this._config.parameters.recommendedMaximumWordCount
          }
        );
        score = this._config.scores.okSubheadings;
      }
      else {
        // Red indicator.
        resultText = Drupal.formatPlural(
          this._tooLongTextsNumber,
          "Subheading distribution: @section_count section of your text is longer than @word_count words and is not separated by any subheadings. Add subheadings to improve readability.",
          "Subheading distribution: @section_count sections of your text is longer than @word_count words and is not separated by any subheadings. Add subheadings to improve readability.",
          {
            "@section_count": this._tooLongTextsNumber,
            "@word_count": this._config.parameters.recommendedMaximumWordCount
          }
        );
        score = this._config.scores.badSubheadings;
      }
    }
    else {
      // Red indicator, use '2' so we can differentiate in external analysis.
      resultText = Drupal.t("Subheading distribution: You are not using any subheadings, although your text is rather long. Try and add some subheadings.");
      score = this._config.scores.badLongTextNoSubheadings;
    }

    return {
      score,
      resultText,
    }
  }
}