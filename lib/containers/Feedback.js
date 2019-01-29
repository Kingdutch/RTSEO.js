import React from 'react';
import { connect } from 'react-redux';
import AssessmentResult from "../components/AssessmentResult";

const Feedback = (props) => {
  let feedback = [];

  console.log("Feedback", props);

  for (let i in props.results) {
    feedback.push(<AssessmentResult key={i} result={props.results[i]} />)
  }

  // TODO: Add translation to Content Analysis.
  // TODO: Remove inline style.
  return (
    <div className={"yoast-wrapper"}>
      <div className={"label"}>Content analysis</div>
      <ul
        className={"wpseoanalysis assessment-results"}
        style={{ paddingLeft: 0, marginLeft: 0 }}>
        {feedback}
      </ul>
    </div>
  );
};

  // TODO: Make the type of results (content vs SEO) selectable by a prop.
const mapStateToProps = state => {
  if (typeof state.analysis[state.selectedKeyword] === "undefined") {
    return {
      results: []
    }
  }

  return {
    results: state.analysis[state.selectedKeyword].contentAssessments
  }
};

export default connect(mapStateToProps)(Feedback);