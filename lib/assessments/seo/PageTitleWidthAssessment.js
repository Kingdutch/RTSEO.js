import { assessments, helpers } from 'yoastseo';

const { inRange } = helpers;

export default class PageTitleWidthAssessment extends assessments.seo.PageTitleWidthAssessment {

  /**
   * Translates the pageTitleWidth score to a message the user can understand.
   *
   * @param {number} pageTitleWidth The width of the pageTitle.
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {string} The translated string.
   */
  translateScore( pageTitleWidth, Drupal ) {
    let resultText = "";

    if ( inRange( pageTitleWidth, 1, 400 ) ) {
      resultText = Drupal.t("SEO title width: The SEO title is too short. Use the space to add keyphrase variations or create compelling call-to-action copy.");
    }
    else if ( inRange( pageTitleWidth, this._config.minLength, this._config.maxLength ) ) {
      resultText = Drupal.t("SEO title width: Good job!");
    }
    else if ( pageTitleWidth > this._config.maxLength ) {
      resultText = Drupal.t("SEO title width: The SEO title is wider than the viewable limit. Try to make it shorter.");
    }
    else {
      resultText = Drupal.t("SEO title width: Please create an SEO title.");
    }

    return resultText;
  }
}
