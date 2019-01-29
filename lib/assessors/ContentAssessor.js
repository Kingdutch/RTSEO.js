import { ContentAssessor as YoastContentAssessor } from 'yoastseo';
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

// Unfortunately this config is not exposed so we just deep reference it.
import contentConfiguration from "yoastseo/src/config/content/combinedConfig";

/**
 * Creates a content assessor based on the one in YoastSEO but overwrites the
 * methods that require an i18n object to use Drupal's t and formatPlural
 * functions instead.
 */
export default class ContentAssessor extends YoastContentAssessor {
  constructor(Drupal, options = {}) {
    super(Drupal, options);

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
