import { assessments } from 'yoastseo';

export default class TextImagesAssessment extends assessments.seo.TextImagesAssessment {

  /**
   * Calculate the score and the feedback string based on the current image count and current image alt-tag count.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object} The calculated score and the feedback string.
   */
  calculateResultRegular( Drupal ) {
    let score = -1;
    let resultText = '';

    if ( this.imageCount === 0 ) {
      score = this._config.scoresRegular.noImages;
      resultText = Drupal.t("Image alt attributes: No images appear on this page. Add some!");
    }
    // Has alt-tag and keywords
    else if ( this.altProperties.withAltKeyword > 0 ) {
      score = this._config.scoresRegular.withAltKeyword;
      resultText = Drupal.t("Image alt attributes: Some images on this page contain alt attributes with words from your keyphrase! Good job!");
    }
    // Has alt-tag, but no keywords and it's not okay
    else if ( this.altProperties.withAltNonKeyword > 0 ) {
      score = this._config.scoresRegular.withAltNonKeyword;
      resultText = Drupal.t("Image alt attributes: Images on this page do not have alt attributes with words from your keyphrase. Fix that!");
    }
    // Has alt-tag, but no keyword is set
    else if ( this.altProperties.withAlt > 0 ) {
      score = this._config.scoresRegular.withAlt;
      resultText = Drupal.t("Image alt attributes: Images on this page do not have alt attributes with words from your keyphrase. Fix that!");
    }
    // Has no alt-tag
    else if ( this.altProperties.noAlt > 0 ) {
      score = this._config.scoresRegular.noAlt;
      resultText = Drupal.t("Image alt attributes: Images on this page do not have alt attributes with words from your keyphrase. Fix that!");
    }
    else {
      return null;
    }

    return {
      score,
      resultText,
    }
  }
}
