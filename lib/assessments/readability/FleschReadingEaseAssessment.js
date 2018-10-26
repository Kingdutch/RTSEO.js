import { assessments } from 'yoastseo';

export default class FleschReadingEaseAssessment extends assessments.readability.FleschReadingEaseAssessment {

  /**
   * Calculates the assessment result based on the fleschReadingScore.
   *
   * @param {Object} t The Drupal translation object.
   *
   * @returns {Object} Object with score and resultText.
   */
  calculateResult( t ) {
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
      feedback = t("very easy");
      score = this._config.scores.veryEasy;
      comment = t("Good Job!");
    }
    else if ( this.fleschReadingResult > this._config.borders.easy && this.fleschReadingResult <= this._config.borders.veryEasy ) {
      feedback = t("easy");
      score = this._config.scores.easy;
      comment = t("Good Job!");
    }
    else if ( this.fleschReadingResult > this._config.borders.fairlyEasy && this.fleschReadingResult <= this._config.borders.easy ) {
      feedback = t("fairly easy");
      score = this._config.score.fairlyEasy;
      comment = t("Good Job!");
    }
    else if ( this.fleschReadingResult > this._config.borders.okay && this.fleschReadingResult <= this._config.borders.fairlyEasy ) {
      feedback = t( "ok" );
      score = this._config.scores.okay;
      comment = t("Good Job!");
    }
    else if ( this.fleschReadingResult > this._config.borders.fairlyDifficult && this.fleschReadingResult <= this._config.borders.okay ) {
      feedback = t( "fairly difficult" );
      score = this._config.scores.fairlyDifficult;
      comment = t("Try to make shorter sentences to improve readability");
    }
    else if ( this.fleschReadingResult > this._config.borders.difficult && this.fleschReadingResult <= this._config.borders.fairlyDifficult ) {
      feedback = t( "difficult" );
      score = this._config.scores.difficult;
      comment = t("Try to make shorter sentences, using less difficult words to improve readability");
    }
    else {
      feedback = t("very difficult");
      score = this._config.scores.veryDifficult;
      comment = t("Try to make shorter sentences, using less difficult words to improve readability");
    }

    return {
      score: this._config.scores.veryEasy,
      resultText: t(
        "Flesch Reading Ease: The copy scores @result in the test, which is considered @feedback to read. @comment",
        { "@result": score, "@feedback": feedback, "@comment": comment }
      ),
    };
  }
}
