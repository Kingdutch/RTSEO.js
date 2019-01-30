import {
  SeoAssessor as YoastSeoAssessor,
  AssessmentResult
} from 'yoastseo';

import {
  IntroductionKeywordAssessment,
  KeyphraseLengthAssessment,
  KeywordDensityAssessment,
  MetaDescriptionKeywordAssessment,
  TextCompetingLinksAssessment,
  InternalLinksAssessment,
  TitleKeywordAssessment,
  UrlKeywordAssessment,
  MetaDescriptionLength,
  SubheadingsKeyword,
  TextImages,
  TextLength,
  OutboundLinks,
  TitleWidth,
  UrlLength,
  urlStopWords,
  /* FunctionWordsInKeyphrase, /* Not currently exported in yoastseo: https://github.com/Yoast/YoastSEO.js/pull/2118 */
  /* SingleH1Assessment, /* Not currently exported in yoastseo: https://github.com/Yoast/YoastSEO.js/pull/2119 */
} from '../assessments/seo';

// Unfortunately these functions are not exposed so we just deep reference them.
import removeDuplicateMarks from "yoastseo/src/markers/removeDuplicateMarks";

/**
 * Shows and error trace of the error message in the console if the console is available.
 *
 * @param {string} [errorMessage=""] The error message.
 * @returns {void}
 */
function showTrace( errorMessage ) {
  if ( typeof errorMessage === 'undefined' ) {
    errorMessage = "";
  }

  if (
    typeof console !== 'undefined' &&
    typeof console.trace !== 'undefined'
  ) {
    console.trace( errorMessage );
  }
}

export default class SEOAssessor extends YoastSeoAssessor {
  constructor(Drupal, options = {}) {
    super(Drupal, options);

    this._assessments = [
      new IntroductionKeywordAssessment(),
      new KeyphraseLengthAssessment(),
      new KeywordDensityAssessment(),
      new MetaDescriptionKeywordAssessment(),
      new MetaDescriptionLength(),
      new SubheadingsKeyword(),
      new TextCompetingLinksAssessment(),
      new TextImages(),
      new TextLength(),
      new OutboundLinks(),
      new TitleKeywordAssessment(),
      new InternalLinksAssessment(),
      new TitleWidth(),
      new UrlKeywordAssessment(),
      new UrlLength(),
      urlStopWords,
      /* new FunctionWordsInKeyphrase(), /* Not currently exported in yoastseo: https://github.com/Yoast/YoastSEO.js/pull/2118 */
      /* new SingleH1Assessment(), /* Not currently exported in yoastseo: https://github.com/Yoast/YoastSEO.js/pull/2119 */
    ];
  }

  /**
   * {@inheritdoc}
   *
   * Overwritten to translate the possible error message.
   */
  executeAssessment( paper, researcher, assessment ) {
    let result;

    try {
      result = assessment.getResult( paper, researcher, this.i18n );
      result.setIdentifier( assessment.identifier );

      if ( result.hasMarks() ) {
        result.marks = assessment.getMarks( paper, researcher );
        result.marks = removeDuplicateMarks( result.marks );
      }

      if ( result.hasMarks() && this.hasMarker( assessment ) ) {
        this.setHasMarkers( true );

        result.setMarker( this.getMarker( assessment, paper, researcher ) );
      }
    } catch ( assessmentError ) {
      showTrace( assessmentError );

      result = new AssessmentResult();

      result.setScore( -1 );
      result.setText(
        // We expect our i18n object to equal Drupal.
        this.i18n.t(
          "An error occurred in the '@name' assessment: @error",
          {
            "@name": assessment.identifier,
            "@error": assessmentError,
          }
        )
      );
    }
    return result;
  };
}
