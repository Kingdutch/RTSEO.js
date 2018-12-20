import { assessments } from 'yoastseo';

import FleschReadingEase
  from "yoastseo/src/assessments/readability/fleschReadingEaseAssessment";
import contentConfiguration from "yoastseo/src/config/content/combinedConfig";
import SubheadingDistributionTooLong
  from "yoastseo/src/assessments/readability/subheadingDistributionTooLongAssessment";
import paragraphTooLong
  from "yoastseo/src/assessments/readability/paragraphTooLongAssessment";
import SentenceLengthInText
  from "yoastseo/src/assessments/readability/sentenceLengthInTextAssessment";
import transitionWords
  from "yoastseo/src/assessments/readability/transitionWordsAssessment";
import passiveVoice
  from "yoastseo/src/assessments/readability/passiveVoiceAssessment";
import textPresence
  from "yoastseo/src/assessments/readability/textPresenceAssessment";
import sentenceBeginnings
  from "yoastseo/src/assessments/readability/sentenceBeginningsAssessment";

const readabilityAssessments = assessments.readability;

class ContentAssessor {
  constructor(t, options) {
    const locale = options.locale ? "en_US";

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
