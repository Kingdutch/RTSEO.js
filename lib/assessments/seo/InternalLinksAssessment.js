import { assessments } from 'yoastseo';

export default class InternalLinksAssessment extends assessments.seo.InternalLinksAssessment {

  /**
   * Returns a score and text based on the linkStatistics object.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object} ResultObject with score and text
   */
  calculateResult( Drupal ) {
    let score = -1;
    let resultText = '';

    if ( this.linkStatistics.internalTotal === 0 ) {
      score = this._config.scores.noInternal;
      resultText = Drupal.t("Internal links: No internal links appear in this page, make sure to add some!");
    }
    else if ( this.linkStatistics.internalNofollow === this.linkStatistics.internalTotal ) {
      score = this._config.scores.noneInternalFollow;
      resultText = Drupal.t("Internal links: The internal links in this page are all nofollowed. Add some good internal links.");
    }
    else if ( this.linkStatistics.internalDofollow === this.linkStatistics.internalTotal ) {
      score = this._config.scores.allInternalFollow;
      resultText = Drupal.t("Internal links: You have enough internal links. Good job!");
    }
    else {
      score = this._config.scores.someInternalFollow;
      resultText = Drupal.t("Internal links: There are both nofollowed and normal internal links on this page. Good job!");
    }

    return {
      score,
      resultText,
    }
  }
}
