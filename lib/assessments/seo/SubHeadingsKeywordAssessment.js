import { assessments } from 'yoastseo';

export default class SubHeadingsKeywordAssessment extends assessments.seo.SubheadingsKeywordAssessment {

  /**
   * Determines the score and the Result text for the subheadings.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object} The object with the calculated score and the result text.
   */
  calculateResultRegular( Drupal ) {
    let score = -1;
    let resultText = '';

    if ( this._subHeadings.matches === 1 ) {
      score = this._config.scoresRegular.oneMatch;
      resultText = Drupal.t("Keyphrase in subheading: Your subheading reflects the topic of your copy. Good job!");
    }
    else if ( this._subHeadings.matches > 1 ) {
      score = this._config.scoresRegular.multipleMatches;
      resultText = Drupal.t(
        "Keyphrase in subheading: @matched (out of @total) subheadings reflect the topic of your copy. Good job!",
        {
          "@matched": this._subHeadings.matches,
          "@total": this._subHeadings.count,
        }
      );
    }
    else {
      score = this._config.scoresRegular.noMatches;
      resultText = Drupal.t("Keyphrase in subheadings: Use more keyphrases or synonyms in your subheadings!");
    }

    return {
      score,
      resultText
    };
  }
}
