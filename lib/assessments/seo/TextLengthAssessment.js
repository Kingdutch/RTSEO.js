import { assessments, AssessmentResult } from 'yoastseo';

export default class TextLengthAssessment extends assessments.seo.TextLengthAssessment {

  /**
   * Execute the Assessment and return a result.
   *
   * @param {Paper} paper The Paper object to assess.
   * @param {Researcher} researcher The Researcher object containing all available researches.
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {AssessmentResult} The result of the assessment, containing both a score and a descriptive text.
   */
  getResult( paper, researcher, Drupal ) {
    const wordCount = researcher.getResearch( "wordCountInText" );
    const assessmentResult = new AssessmentResult();

    assessmentResult.setScore( this.calculateScore( wordCount ) );
    assessmentResult.setText(
      this.translateScore( assessmentResult.getScore(), wordCount, Drupal )
    );

    return assessmentResult;
  }

  /**
   * Translates the score to a message the user can understand.
   *
   * @param {number} score The amount of words to be checked against.
   * @param {number} wordCount The amount of words.
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {string} The translated string.
   */
  translateScore( score, wordCount, Drupal ) {
    let resultText = "";

    if ( score === this._config.scores.recommendedMinimum ) {
      resultText = Drupal.formatPlural(
        wordCount,
        "Text length: The text contains @count word. Good job!",
        "Text length: The text contains @count words. Good job!",
        { "@count": wordCount }
      );
    }
    else if ( score === this._config.scores.slightlyBelowMinimum ) {
      resultText = Drupal.formatPlural(
        wordCount,
        "Text length: The text contains @count word.",
        "Text length: The text contains @count words.",
        { "@count": wordCount }
      );
      resultText += " " + Drupal.formatPlural(
        this._config.recommendedMinimum,
        "This is slightly below the recommended minimum of @count word. Add a bit more copy.",
        "This is slightly below the recommended minimum of @count words. Add a bit more copy.",
        { "@count": this._config.recommendedMinimum }
      );
    }
    else if ( score === this._config.scores.belowMinimum ) {
      resultText = Drupal.formatPlural(
        wordCount,
        "Text length: The text contains @count word.",
        "Text length: The text contains @count words.",
        { "@count": wordCount }
      );
      resultText += " " + Drupal.formatPlural(
        this._config.recommendedMinimum,
        "This is below the recommended minimum of @count word. Add mode content.",
        "This is below the recommended minimum of @count words. Add more content.",
        { "@count": this._config.recommendedMinimum }
      );
    }
    else if ( score === this._config.scores.farBelowMinimum || score === this._config.scores.veryFarBelowMinimum ) {
      resultText = Drupal.formatPlural(
        wordCount,
        "Text length: The text contains @count word.",
        "Text length: The text contains @count words.",
        { "@count": wordCount }
      );
      resultText += " " + Drupal.formatPlural(
        this._config.recommendedMinimum,
        "This is far below the recommended minimum of @count word. Add more content.",
        "This is far below the recommended minimum of @count words. Add more content.",
        { "@count": this._config.recommendedMinimum }
      );
    }

    return resultText;
  }
}
