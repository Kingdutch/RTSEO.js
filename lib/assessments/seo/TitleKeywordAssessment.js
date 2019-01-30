import { assessments } from 'yoastseo';

export default class TitleKeywordAssessment extends assessments.seo.TitleKeywordAssessment {

  /**
   * Calculates the result based on whether and how the keyphrase was matched in the title. Returns GOOD result if
   * an exact match of the keyword is found in the beginning of the title. Returns OK results if all content words
   * from the keyphrase are in the title (in any form). Returns BAD otherwise.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   * @param {string} keyword The keyword of the paper (to be returned in the feedback strings).
   *
   * @returns {Object} Object with score and text.
   */
  calculateResult( Drupal, keyword ) {
    const exactMatchFound = this._keywordMatches.exactMatchFound;
    const position = this._keywordMatches.position;
    const allWordsFound = this._keywordMatches.allWordsFound;
    const exactMatchKeyphrase = this._keywordMatches.exactMatchKeyphrase;

    let score = -1;
    let resultText = '';

    if ( exactMatchFound === true ) {
      if ( position === 0 ) {
        score = this._config.scores.good;
        resultText = Drupal.t("Keyphrase in title: The exact match of the keyphrase appears at the beginning of the SEO title. Good job!");
      }
      else {
        score = this._config.scores.okay;
        resultText = Drupal.t("Keyphrase in title: The exact match of the keyphrase appears in the SEO title, but not at the beginning. Try to move it to the beginnign.");
      }
    }
    else if ( allWordsFound ) {
      score = this._config.scores.okay;
      resultText = Drupal.t("Keyphrase in title: Does not contain the exact match. Try to write the exact match of your keyphrase in the SEO title.");
    }
    else if ( exactMatchKeyphrase ) {
      score = this._config.scores.bad;
      resultText = Drupal.t("Keyphrase in title: Does not contain the exact match. Try to write the exact match of your keyphrase in the SEO title");
    }
    else {
      score = this._config.scores.bad;
      resultText = Drupal.t(
        "Keyphrase in title: Not all the words from your keyphrase \"@keyphrase\" appear in the SEO title. Try to use the exact match of your keyphrase in the SEO title.",
        { "@keyphrase": keyword }
      )
    }

    return {
      score,
      resultText,
    }
  }
}
