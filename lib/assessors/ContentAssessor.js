import {
  ContentAssessor as YoastContentAssessor,
  AssessmentResult
} from 'yoastseo';
import  {
  FleschReadingEase,
  passiveVoice,
  transitionWords,
  sentenceBeginnings,
  SubheadingDistributionTooLong,
  SentenceLengthInText,
  textPresence,
  paragraphTooLong,
} from "../assessments/readability";

// Unfortunately these functions are not exposed so we just deep reference them.
import contentConfiguration from "yoastseo/src/config/content/combinedConfig";
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

/**
 * Creates a content assessor based on the one in YoastSEO but overwrites the
 * methods that require an i18n object to use Drupal's t and formatPlural
 * functions instead.
 */
export default class ContentAssessor extends YoastContentAssessor {
  constructor(Drupal, options = {}) {
    super(Drupal, options);

    const locale = ( options.hasOwnProperty( "locale" ) ) ? options.locale : "en_US";

    // Replace the assessments with our own that use the Drupal t function.
    this._assessments = [
      new FleschReadingEase( contentConfiguration( locale ).fleschReading ),
      new SubheadingDistributionTooLong(),
      paragraphTooLong,
      new SentenceLengthInText( contentConfiguration( locale ).sentenceLength ),
      transitionWords,
      passiveVoice,
      textPresence,
      sentenceBeginnings,
      // Temporarily disabled: wordComplexity,
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
