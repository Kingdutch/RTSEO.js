import { AssessmentResult, assessments } from 'yoastseo';

/**
 * Calculate the score based on the amount of stop words in the url.
 *
 * @param {number} stopWordCount The amount of stop words to be checked against.
 * @param {Object} Drupal The Drupal object containing t and formatPlural.
 *
 * @returns {Object} The resulting score object.
 */
const calculateUrlStopWordsCountResult = function( stopWordCount, Drupal ) {

  if ( stopWordCount > 0 ) {
    return {
      score: 5,
      text: Drupal.formatPlural(
        stopWordCount,
        "Slug stopwords: The slug for this page contains a stop word. Remove it!",
        "Slug stopwords: The slug for this page contains stop words. Remove them!",
      )
    };
  }

  return {};
};

/**
 * Execute the Assessment and return a result.
 *
 * @param {Paper} paper The Paper object to assess.
 * @param {Researcher} researcher The Researcher object containing all available researches.
 * @param {Object} Drupal The Drupal object containing t and formatPlural.
 *
 * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
 */
const urlHasStopWordsAssessment = function( paper, researcher, Drupal ) {
  const stopWords = researcher.getResearch( "stopWordsInUrl" );

  const assessmentResult = new AssessmentResult();

  const stopWordsResult = calculateUrlStopWordsCountResult( stopWords.length, Drupal );

  assessmentResult.setScore( stopWordsResult.score );
  assessmentResult.setText( stopWordsResult.text );

  return assessmentResult;
};


export default {
  ...assessments.seo.UrlStopWordsAssessment,
  getResult: urlHasStopWordsAssessment,
}
