import { assessments } from 'yoastseo';

export default class OutboundLinksAssessment extends assessments.seo.OutboundLinksAssessment {

  /**
   * Translates the score to a message the user can understand.
   *
   * @param {Object} linkStatistics The object with all link statistics.
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {string} The translated string.
   */
  translateScore( linkStatistics, Drupal ) {
    let resultText = "";

    if ( linkStatistics.externalTotal === 0 ) {
      resultText = Drupal.t("Outbound links: No outbount links appear in this page. Add some!");
    }
    else if ( linkStatistics.externalNofollow === linkStatistics.externalTotal ) {
      resultText = Drupal.t("Outbound links: All outbound links on this page are nofollowed. Add some normal links.");
    }
    else if ( linkStatistics.externalDofollow === linkStatistics.externalTotal ) {
      resultText = Drupal.t("Outbound links: Good job!");
    }
    else if ( linkStatistics.externalDofollow < linkStatistics.externalTotal ) {
      resultText = Drupal.t("Outbound links: There are both nofollowed and normal outbound links on this page. Good job!");
    }

    return resultText;
  }
}
