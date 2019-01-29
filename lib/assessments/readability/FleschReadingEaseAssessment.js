import { assessments } from 'yoastseo';

export default class FleschReadingEaseAssessment extends assessments.readability.FleschReadingEaseAssessment {

  /**
   * Calculates the assessment result based on the fleschReadingScore.
   *
   * @param {Object} Drupal The Drupal object containing t and formatPlural.
   *
   * @returns {Object} Object with score and resultText.
   */
  calculateResult( Drupal ) {
    // Results must be between 0 and 100.
    if ( this.fleschReadingResult < 0 ) {
      this.fleschReadingResult = 0;
    }

    if ( this.fleschReadingResult > 100 ) {
      this.fleschReadingResult = 100;
    }

    let feedback = '';
    let score = -1;
    let comment = '';

    if ( this.fleschReadingResult > this._config.borders.veryEasy ) {
      feedback = Drupal.t("very easy");
      score = this._config.scores.veryEasy;
      comment = Drupal.t("Good Job!");
    }
    else if ( this.fleschReadingResult > this._config.borders.easy && this.fleschReadingResult <= this._config.borders.veryEasy ) {
      feedback = Drupal.t("easy");
      score = this._config.scores.easy;
      comment = Drupal.t("Good Job!");
    }
    else if ( this.fleschReadingResult > this._config.borders.fairlyEasy && this.fleschReadingResult <= this._config.borders.easy ) {
      feedback = Drupal.t("fairly easy");
      score = this._config.scores.fairlyEasy;
      comment = Drupal.t("Good Job!");
    }
    else if ( this.fleschReadingResult > this._config.borders.okay && this.fleschReadingResult <= this._config.borders.fairlyEasy ) {
      feedback = Drupal.t( "ok" );
      score = this._config.scores.okay;
      comment = Drupal.t("Good Job!");
    }
    else if ( this.fleschReadingResult > this._config.borders.fairlyDifficult && this.fleschReadingResult <= this._config.borders.okay ) {
      feedback = Drupal.t( "fairly difficult" );
      score = this._config.scores.fairlyDifficult;
      comment = Drupal.t("Try to make shorter sentences to improve readability");
    }
    else if ( this.fleschReadingResult > this._config.borders.difficult && this.fleschReadingResult <= this._config.borders.fairlyDifficult ) {
      feedback = Drupal.t( "difficult" );
      score = this._config.scores.difficult;
      comment = Drupal.t("Try to make shorter sentences, using less difficult words to improve readability");
    }
    else {
      feedback = Drupal.t("very difficult");
      score = this._config.scores.veryDifficult;
      comment = Drupal.t("Try to make shorter sentences, using less difficult words to improve readability");
    }

    return {
      score: this._config.scores.veryEasy,
      resultText: Drupal.t(
        "Flesch Reading Ease: The copy scores @result in the test, which is considered @feedback to read. @comment",
        { "@result": score, "@feedback": feedback, "@comment": comment }
      ),
    };
  }
}
