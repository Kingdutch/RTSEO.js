import { assessments, AssessmentResult, helpers } from 'yoastseo';
const { inRange } = helpers;

// 150 is the recommendedValue for the maximum paragraph length.
const recommendedValue = 150;

/**
 * Returns an array containing only the paragraphs longer than the recommended length.
 * @param {array} paragraphsLength The array containing the lengths of individual paragraphs.
 * @returns {array} The array of too long paragraphs.
 */
const getTooLongParagraphs = function( paragraphsLength  ) {
  return paragraphsLength.filter(( paragraph ) => {
    return paragraph.wordCount > recommendedValue;
  });
};

/**
 * Returns the scores and text for the ParagraphTooLongAssessment
 * @param {array} paragraphsLength The array containing the lengths of individual paragraphs.
 * @param {array} tooLongParagraphs The array of too long paragraphs.
 * @param {object} Drupal The Drupal object containing t and formatPlural.
 * @returns {{score: number, text: string }} the assessmentResult.
 */
const calculateParagraphLengthResult = function( paragraphsLength, tooLongParagraphs, Drupal ) {
  let score;
  let hasMarks;
  let feedback = '';

  if ( paragraphsLength.length === 0 ) {
    return {};
  }

  const longestParagraphLength = paragraphsLength[ 0 ].wordCount;

  if ( longestParagraphLength <= 150 ) {
    // Green indicator.
    score = 9;
  }

  if ( inRange( longestParagraphLength, 150, 200 ) ) {
    // Orange indicator.
    score = 6;
  }

  if ( longestParagraphLength > 200 ) {
    // Red indicator.
    score = 3;
  }

  if ( score >= 7 ) {
    hasMarks = false;
    feedback = Drupal.t("Paragraph length: None of the paragraphs are too long. Great job!");
  }
  else {
    hasMarks = true;
    feedback = Drupal.t(
      tooLongParagraphs.length,
      "Paragraph length: @paragraph_count of the paragraphs contain more than the recommended maximum of @word_count words. Shorten your paragraphs!",
      "Paragraph length: @paragraph_count of the paragraphs contain more than the recommended maximum of @word_count words. Shorten your paragraphs!",
      {
        "@paragraph_count": tooLongParagraphs.length,
        "@word_count": recommendedValue,
      }
    );
  }

  return {
    score,
    hasMarks,
    text: feedback,
  };
};

/**
 * Sort the paragraphs based on word count.
 *
 * @param {Array} paragraphs The array with paragraphs.
 * @returns {Array} The array sorted on word counts.
 */
var sortParagraphs = function( paragraphs ) {
  return paragraphs.sort(
    function( a, b ) {
      return b.wordCount - a.wordCount;
    }
  );
};

/**
 * Runs the getParagraphLength module, based on this returns an assessment result with score and text.
 * @param {object} paper The paper to use for the assessment.
 * @param {object} researcher The researcher used for calling research.
 * @param {object} Drupal The Drupal object containing t and formatPlural.
 * @returns {object} the Assessmentresult
 */
var paragraphLengthAssessment = function( paper, researcher, Drupal ) {
  var paragraphsLength = researcher.getResearch( "getParagraphLength" );

  paragraphsLength = sortParagraphs( paragraphsLength );

  var tooLongParagraphs = getTooLongParagraphs( paragraphsLength );
  var paragraphLengthResult = calculateParagraphLengthResult( paragraphsLength, tooLongParagraphs, Drupal );
  var assessmentResult = new AssessmentResult();

  assessmentResult.setScore( paragraphLengthResult.score );
  assessmentResult.setText( paragraphLengthResult.text );
  assessmentResult.setHasMarks( paragraphLengthResult.hasMarks );

  return assessmentResult;
};

export default {
  ...assessments.readability.ParagraphTooLongAssessment,
  getResult: paragraphLengthAssessment,
}
