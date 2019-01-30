import React from "react";

// TODO: Inject Drupal through a provider.
// TODO: Make this configurable again.
const scoreToValues = (score) => {
  if (score === 0) {
    return {
      icon: "na",
      screenReaderText: Drupal.t("Feedback"),
    }
  }
  else if (score < 5) {
    return {
      icon: "bad",
      screenReaderText: Drupal.t("Bad SEO score"),
    }
  }
  else if (score < 8) {
    return {
      icon: "ok",
      screenReaderText: Drupal.t("Ok SEO score"),
    }
  }
  else {
    return {
      icon: "good",
      screenReaderText: Drupal.t("Good SEO score"),
    }
  }
}

export default function AssessmentResult(props) {
  const { result } = props;

  const score = result.getScore();
  const text = result.getText();

  const { icon, screenReaderText } = scoreToValues(score);

  return (
    <li className={"score"}>
      <span className={["wpseo-score-icon", icon].join(" ")}></span>
      <span className={"screen-reader-text"}>{screenReaderText}</span>
      <span className={"wpseo-score-text"}>{text}</span>
    </li>
  )
}
