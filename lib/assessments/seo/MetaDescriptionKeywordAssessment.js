import { assessments } from 'yoastseo';

export default class MetaDescriptionKeywordAssessment extends assessments.seo.MetaDescriptionKeywordAssessment {

  /**
   * Returns the result object based on the number of keyword matches in the meta description.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object} Result object with score and text.
   */
  calculateResult( Drupal ) {
    let score = -1;
    let resultText = '';

    // GOOD result when the meta description contains a keyphrase or synonym 1 or 2 times.
    if ( this._keyphraseCounts === 1 || this._keyphraseCounts === 2 ) {
      score = this._config.scores.good;
      resultText = Drupal.t("Keyphrase in meta description: Keyphrase or synonym appear in the meta description. Well done!");
    }
    // BAD if the description contains every keyword term more than twice.
    else if ( this._keyphraseCounts >= 3 ) {
      score = this._config.scores.bad;
      resultText = Drupal.t(
        "Keyphrase in meta description: The meta description contains the keyphrase @count times, which is over the advised maximum of 2 times. Limit that!",
        { "@count": this._keyphraseCounts }
      );
    }
    // BAD if the keyphrases is not contained in the meta description.
    else {
      score = this._config.scores.bad;
      resultText = Drupal.t("Keyphrase in meta description: The meta description has been specified, but it does not contain the keyphrase. Fix that!");
    }

    return {
      score,
      resultText,
    }
  }
}
