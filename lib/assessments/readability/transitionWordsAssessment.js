/**
 * @file
 * Contains overwrites for the transitionWordsAssessment.
 *
 * Overwrites the transitionWordsAssessment of the YoastSEO module to use Drupal.t
 * instead of an i18n object.
 */

import { AssessmentResult, helpers, assessments } from "yoastseo";
import formatNumber from "../../helpers/formatNumber";

const inRange = helpers.inRangeStartInclusive;

/**
 * Calculates the actual percentage of transition words in the sentences.
 *
 * @param {object} sentences The object containing the total number of sentences and the number of sentences containing
 * a transition word.
 * @returns {number} The percentage of sentences containing a transition word.
 */
const calculateTransitionWordPercentage = function( sentences ) {
  if ( sentences.transitionWordSentences === 0 || sentences.totalSentences === 0 ) {
    return 0;
  }

  return formatNumber( ( sentences.transitionWordSentences / sentences.totalSentences ) * 100 );
};

/**
 * Calculates the score for the assessment based on the percentage of sentences containing transition words.
 *
 * @param {number} percentage The percentage of sentences containing transition words.
 * @returns {number} The score.
 */
const calculateScoreFromPercentage = function( percentage ) {
  if ( percentage < 20 ) {
    // Red indicator.
    return 3;
  }

  if ( inRange( percentage, 20, 30 ) ) {
    // Orange indicator.
    return 6;
  }

  if ( percentage >= 30 ) {
    // Green indicator.
    return 9;
  }
};

/**
 * Calculates transition word result
 * @param {object} transitionWordSentences The object containing the total number of sentences and the number of sentences containing
 * a transition word.
 * @param {object} Drupal The Drupal object containing t and formatPlural.
 * @returns {object} Object containing score and text.
 */
const calculateTransitionWordResult = function( transitionWordSentences, Drupal ) {
  const percentage = calculateTransitionWordPercentage( transitionWordSentences );
  const score = calculateScoreFromPercentage( percentage );
  const hasMarks = ( percentage > 0 );

  if ( score < 7 && percentage === 0 ) {
    return {
      score: formatNumber( score ),
      hasMarks: hasMarks,
      text: Drupal.t("Transition words: None of the sentences contain transition words. Use some."),
    };
  }

  if ( score < 7 ) {
    return {
      score: formatNumber( score ),
      hasMarks: hasMarks,
      text: Drupal.t("Transition words: Only @percentage of the sentences contain transition words, which is not enough. Use more of them.", {
        "@percentage": percentage + "%",
      }),
    };
  }

  return {
    score: formatNumber( score ),
    hasMarks: hasMarks,
    text: Drupal.t("Transition words: Well done!"),
  };
};

/**
 * Scores the percentage of sentences including one or more transition words.
 * @param {object} paper The paper to use for the assessment.
 * @param {object} researcher The researcher used for calling research.
 * @param {object} Drupal The Drupal object containing t and formatPlural.
 * @returns {object} The Assessment result.
 */
const transitionWordsAssessment = function( paper, researcher, Drupal ) {
  const transitionWordSentences = researcher.getResearch( "findTransitionWords" );
  const transitionWordResult = calculateTransitionWordResult( transitionWordSentences, Drupal );
  const assessmentResult = new AssessmentResult();

  assessmentResult.setScore( transitionWordResult.score );
  assessmentResult.setText( transitionWordResult.text );
  assessmentResult.setHasMarks( transitionWordResult.hasMarks );

  return assessmentResult;
};

export default {
  ...assessments.readability.TransitionWordsAssessment,
  getResult: transitionWordsAssessment,
}