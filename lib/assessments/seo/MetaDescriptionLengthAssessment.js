import { assessments } from 'yoastseo';

export default class MetaDescriptionLengthAssessment extends assessments.seo.MetaDescriptionLengthAssessment {

  /**
   * Translates the descriptionLength to a message the user can understand.
   *
   * @param {number} descriptionLength The length of the metadescription.
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {string} The translated string.
   */
  translateScore( descriptionLength, Drupal ) {
    if ( descriptionLength === 0 ) {
      return Drupal.t("Meta description length: No meta description has been specified. Search engines will display copy from the page instead. Make sure to write one!");
    }
    else if ( descriptionLength <= this._config.recommendedMaximumLength ) {
      return Drupal.t(
        "Meta description length: The meta description is too short (under @recommended characters). Up to @maximum characters are available. Use the space!",
        {
          '@recommended': this._config.recommendedMaximumLength,
          '@maximum': this._config.maximumLength,
        }
      );
    }
    else if ( descriptionLength > this._config.maximumLength ) {
      return Drupal.t(
        "Meta description length: The meta description is over @maximum characters. To ensure the entire description will be visible, you should reduce the length!",
        { "@maximum": this_config.maximumLength }
      );
    }
    else if ( descriptionLength >= this._config.recommendedMaximumLength && descriptionLength <= this._config.maximumLength ) {
      return Drupal.t("Meta description length: Well done!");
    }
  }
}
