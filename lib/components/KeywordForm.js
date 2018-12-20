import React from 'react';
import { updateKeyword } from "../actions";
import { connect } from "react-redux";

class KeywordForm extends React.Component {

  constructor(props) {
    super(props);

    this.updateKeyword = this.updateKeyword.bind(this);
  }

  updateKeyword(e) {
    e.preventDefault();
    this.props.updateKeyword(e.target.value);
  }

  render() {
    return (
      <React.Fragment>
        <label htmlFor="focus-keyword">Focus Keyword</label>
        <input
          id={"focus-keyword"}
          type={"text"}
          size={60}
          maxLength={128}
          className={["form-text"]}
          onChange={this.updateKeyword}
          value={this.props.keyword}
        />
        {/* TODO: Make the sentence below translatable */}
        <div className={"description"}>Pick the main keyword or keyphrase that this post/page is about.</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    keyword: state.keyword,
  };
};

const mapDispatchToProps = {
  updateKeyword,
};

export default connect(mapStateToProps, mapDispatchToProps)(KeywordForm);