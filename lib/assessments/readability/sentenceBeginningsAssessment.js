/**
 * @file
 * Contains overwrites for the sentenceBeginningsAssessment.
 *
 * Overwrites the sentenceBeginningsAssessment of the YoastSEO module to use
 * Drupal.t instead of an i18n object.
 */

import { AssessmentResult, assessments } from "yoastseo";

const maximumConsecutiveDuplicates = 2;

/**
 * Counts and groups the number too often used sentence beginnings and determines the lowest count within that group.
 * @param {array} sentenceBeginnings The array containing the objects containing the beginning words and counts.
 * @returns {object} The object containing the total number of too often used beginnings and the lowest count within those.
 */
const groupSentenceBeginnings = function( sentenceBeginnings ) {
  const tooOften = sentenceBeginnings.filter(( word ) => word.count > maximumConsecutiveDuplicates);

  if ( tooOften.length === 0 ) {
    return { total: 0 };
  }

  // Sort in ascending order.
  const sortedCounts = tooOften.sort((a, b) => a.count - b.count);

  return { total: tooOften.length, lowestCount: sortedCounts[ 0 ].count };
};

/**
 * Calculates the score based on sentence beginnings.
 * @param {object} groupedSentenceBeginnings The object with grouped sentence beginnings.
 * @param {object} Drupal The Drupal object containing t and formatPlural.
 * @returns {{score: number, text: string, hasMarks: boolean}} result object with score and text.
 */
const calculateSentenceBeginningsResult = function( groupedSentenceBeginnings, Drupal ) {
  if ( groupedSentenceBeginnings.total > 0 ) {
    return {
      score: 3,
      hasMarks: true,
      text: Drupal.formatPlural(
        groupedSentenceBeginnings.total,
        "Consecutive sentences: The text contains @lowestCount consecutive sentences starting with the same word. Try to mix things up!",
        "Consecutive sentences: The text contains @count instances where @lowestCount or more consecutive sentences start with the same word. Try to mix things up!",
        { '@lowestCount': groupedSentenceBeginnings.lowestCount }
      ),
    };
  }
  return {
    score: 9,
    hasMarks: false,
    text: Drupal.t("There is enough variety in your sentences. That's great!"),
  };
};

/**
 * Scores the repetition of sentence beginnings in consecutive sentences.
 * @param {object} paper The paper to use for the assessment.
 * @param {object} researcher The researcher used for calling research.
 * @param {object} Drupal The Drupal object containing t and formatPlural.
 * @returns {object} The Assessment result
 */
const sentenceBeginningsAssessment = function( paper, researcher, Drupal ) {
  const sentenceBeginnings = researcher.getResearch( "getSentenceBeginnings" );
  const groupedSentenceBeginnings = groupSentenceBeginnings( sentenceBeginnings );
  const sentenceBeginningsResult = calculateSentenceBeginningsResult( groupedSentenceBeginnings, Drupal );
  const assessmentResult = new AssessmentResult();

  assessmentResult.setScore( sentenceBeginningsResult.score );
  assessmentResult.setText( sentenceBeginningsResult.text );
  assessmentResult.setHasMarks( sentenceBeginningsResult.hasMarks );
  return assessmentResult;
};

export default {
  ...assessments.readability.SentenceBeginningsAssessment,
  getResult: sentenceBeginningsAssessment,
}
