import React from 'react';
import AssessmentResult from "../components/AssessmentResult";

const Feedback = (props) => {
  let feedback = [];

  for (let i in props.results) {
    feedback.push(<AssessmentResult key={i} result={props.results[i]} />)
  }

  // TODO: Remove inline style.
  return (
    <div className={"yoast-wrapper"}>
      <div className={"label"}>{props.label}</div>
      <ul
        className={"wpseoanalysis assessment-results"}
        style={{ paddingLeft: 0, marginLeft: 0 }}>
        {feedback}
      </ul>
    </div>
  );
};

export default Feedback;