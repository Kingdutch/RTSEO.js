import { assessments } from 'yoastseo';

export default class UrlLengthAssessment extends assessments.seo.UrlLengthAssessment {

  /**
   * Translates the score to a message the user can understand.
   *
   * @param {boolean} urlIsTooLong True when the URL is too long.
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {string} The translated string.
   */
  translateScore( urlIsTooLong, Drupal ) {
    if ( urlIsTooLong ) {
      return Drupal.t("Slug too long: The slug for this page is a bit long. Shorten it!");
    }

    return "";
  }
}
