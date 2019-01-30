import { assessments, AssessmentResult } from 'yoastseo';

export default class FunctionWordsInKeyphraseAssessment extends assessments.seo.FunctionWordsInKeyphraseAssessment {

  /**
   * Runs the functionWordsInKeyphrase researcher, based on this returns an assessment result with score.
   *
   * @param {Paper} paper The paper to use for the assessment.
   * @param {Researcher} researcher The researcher used for calling research.
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {AssessmentResult} The result of the assessment.
   */
  getResult( paper, researcher, Drupal ) {
    this._functionWordsInKeyphrase = researcher.getResearch( "functionWordsInKeyphrase" );
    this._keyword = escape( paper.getKeyword() );
    const assessmentResult = new AssessmentResult();

    if ( this._functionWordsInKeyphrase ) {
      assessmentResult.setScore( this._config.scores.onlyFunctionWords );
      assessmentResult.setText(
        Drupal.t(
          "Function words in keyphrase: Your keyphrase \"@keyphrase\" contains function words only. Learn more about what makes a good keyphrase.",
          { "@keyphrase": this._keyword }
        )
      );
    }

    return assessmentResult;
  }
}
