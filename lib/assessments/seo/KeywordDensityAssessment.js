import { assessments } from 'yoastseo';
import formatNumber from '../../helpers/formatNumber';

export default class KeywordDensityAssessment extends assessments.seo.KeywordDensityAssessment {

  /**
   * Returns the score for the keyphrase density (for Regular analysis).
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object} The object with calculated score and resultText.
   */
  calculateResultRegular( Drupal ) {
    const max = this._boundaries.maximum;
    const maxText = `${ max }%`;
    const roundedKeywordDensity = formatNumber( this._keywordDensity );
    const keywordDensityPercentage = roundedKeywordDensity + "%";

    let score = -1;
    let resultText = '';

    if ( this.hasNoMatches() ) {
      score = this._config.scores.underMinimum;
      resultText = Drupal.t(
        "Keyphrase density: @percentage. This is too low; the keyphrase was found @count times. Focus on your keyphrase!",
        {
          "@percentage": keywordDensityPercentage,
          "@count": this._keywordCount.count,
        }
      );
    }
    else if ( this.hasTooFewMatches() ) {
      score = this._config.scores.underMinimum;
      resultText = Drupal.formatPlural(
        this._keywordCount.count,
        "Keyphrase density: @percentage. This is too low; the keyphrase was found @count time. Focus on your keyphrase!",
        "Keyphrase density: @percentage. This is too low; the keyphrase was found @count times. Focus on your keyphrase!",
        {
          "@percentage": keywordDensityPercentage,
          "@count": this._keywordCount.count,
        }
      );
    }
    else if ( this.hasGoodNumberOfMatches()  ) {
      score = this._config.scores.correctDensity;
      resultText = Drupal.t(
        "Keyphrase density: @percentage. This is great!",
        {
          "@percentage": keywordDensityPercentage,
        }
      );
    }
    else if ( this.hasTooManyMatches() ) {
      score = this._config.scores.overMaximum;
      resultText = Drupal.formatPlural(
        this._keywordCount.count,
        "Keyphrase density: @percentage. This is over the advised @maximum maximum; the keyphrase was found @count time. Don't overoptimise!",
        "Keyphrase density: @percentage. This is over the advised @maximum maximum; the keyphrase was found @count times. Don't overoptimise!",
        {
          "@percentage": keywordDensityPercentage,
          "@maximum": maxText,
          "@count": this._keywordCount.count,
        }
      );
    }
    else {
      score = this._config.scores.wayOverMaximum;
      resultText = Drupal.formatPlural(
        this._keywordCount.count,
        "Keyphrase density: @percentage. This is way over the advised @maximum maximum; the keyphrase was found @count time. Don't overoptimise!",
        "Keyphrase density: @percentage. This is way over the advised @maximum maximum; the keyphrase was found @count times. Don't overoptimise!",
        {
          "@percentage": keywordDensityPercentage,
          "@maximum": maxText,
          "@count": this._keywordCount.count,
        }
      );
    }

    return {
      score,
      resultText,
    }
  }
}
