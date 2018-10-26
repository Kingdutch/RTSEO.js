import { ContentAssessor as YoastContentAssessor } from 'yoastseo';
import  {
  FleschReadingEase,
  passiveVoice,
  transitionWords,
} from "../assessments/readability";

// TODO: Replace these with our own using the Drupal.t function.
import passiveVoice
  from "yoastseo/src/assessments/readability/passiveVoiceAssessment";
import transitionWords
  from "yoastseo/src/assessments/readability/transitionWordsAssessment";
import sentenceBeginnings
  from "yoastseo/src/assessments/readability/sentenceBeginningsAssessment";
import SubheadingDistributionTooLong
  from "yoastseo/src/assessments/readability/subheadingDistributionTooLongAssessment";
import SentenceLengthInText
  from "yoastseo/src/assessments/readability/sentenceLengthInTextAssessment";
import contentConfiguration from "yoastseo/src/config/content/combinedConfig";
import textPresence
  from "yoastseo/src/assessments/readability/textPresenceAssessment";
import paragraphTooLong
  from "yoastseo/src/assessments/readability/paragraphTooLongAssessment";

/**
 * Creates a content assessor based on the on in YoastSEO but overwrites the
 * methods that require an i18n object to use Drupal's t function instead.
 */
class ContentAssessor extends YoastContentAssessor {
  constructor(t, options = {}) {
    super(t, options);

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
}
