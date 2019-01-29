import { string, AssessmentResult } from 'yoastseo';

/**
 * Assesses that the paper has at least a little bit of content.
 *
 * @param {Paper} paper The paper to assess.
 * @param {Researcher} researcher The researcher.
 * @param {Object} Drupal The Drupal object containing t and formatPlural.
 * @returns {AssessmentResult} The result of this assessment.
 */
function textPresenceAssessment( paper, researcher, Drupal ) {
  const text = string.stripHTMLTags( paper.getText() );

  const result = new AssessmentResult();

  if ( text.length < 50 ) {
    result.setText( Drupal.t("Not enough content: Please add some content to enable a good analysis." ) );
    result.setScore( 3 );
  }

  return result;
}

export default {
  identifier: "textPresence",
  getResult: textPresenceAssessment,
};
