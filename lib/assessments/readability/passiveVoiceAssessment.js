/**
 * @file
 * Contains overwrites for the passiveVoiceAssessment.
 *
 * Overwrites the passiveVoiceAssessment of the YoastSEO module to use Drupal.t
 * instead of an i18n object.
 */
import { AssessmentResult, helpers, assessments } from "yoastseo";
import formatNumber from "../../helpers/formatNumber";

const inRange = helpers.inRangeEndInclusive;

/**
 * Calculates the result based on the number of sentences and passives.
 *
 * @param {object} passiveVoice The object containing the number of sentences and passives
 * @param {object} Drupal The Drupal object containing t and formatPlural.
 * @returns {{score: number, text}} resultobject with score and text.
 */
const calculatePassiveVoiceResult = function( passiveVoice, Drupal ) {
  let score;
  let percentage = 0;
  const recommendedValue = 10;

  // Prevent division by zero errors.
  if ( passiveVoice.total !== 0 ) {
    percentage = formatNumber( ( passiveVoice.passives.length / passiveVoice.total ) * 100 );
  }

  const hasMarks = percentage > 0;

  if ( percentage <= 10 ) {
    // Green indicator.
    score = 9;
  }

  if ( inRange( percentage, 10, 15 ) ) {
    // Orange indicator.
    score = 6;
  }

  if ( percentage > 15 ) {
    // Red indicator.
    score = 3;
  }

  if ( score >= 7 ) {
    return {
      score: score,
      hasMarks: hasMarks,
      text: Drupal.t("Passive Voice: You're using enough active voice. That's great!"),
    };
  }
  return {
    score: score,
    hasMarks: hasMarks,
    text: Drupal.t(
      "Passive Voice: @percentage of the sentences contain passive voice, which is more than the recommended maximum of @maximum. Try to use their active counterparts.", {
        '@percentage': percentage + "%",
        "@maximum": recommendedValue + "%",
      }
    ),
  };
};

/**
 * Runs the passiveVoice module, based on this returns an assessment result with score and text.
 * @param {object} paper The paper to use for the assessment.
 * @param {object} researcher The researcher used for calling research.
 * @param {object} Drupal The Drupal object containing t and formatPlural.
 * @returns {object} the Assessmentresult
 */
const passiveVoiceAssessment = function( paper, researcher, Drupal ) {
  const passiveVoice = researcher.getResearch( "passiveVoice" );

  const passiveVoiceResult = calculatePassiveVoiceResult( passiveVoice, Drupal );

  const assessmentResult = new AssessmentResult();

  assessmentResult.setScore( passiveVoiceResult.score );
  assessmentResult.setText( passiveVoiceResult.text );
  assessmentResult.setHasMarks( passiveVoiceResult.hasMarks );

  return assessmentResult;
};

export default {
  ...assessments.readability.PassiveVoiceAssessment,
  getResult: passiveVoiceAssessment,
};
