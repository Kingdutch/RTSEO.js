import React from 'react';

export default class Feedback extends React.Component {
  render() {
    return (
      <div className={"yoast-wrapper"}>
        <div className="label">Content analysis</div>
        <div id="yoast-output">
          <div>Hello World!</div>
        </div>
      </div>
    );
  }
}