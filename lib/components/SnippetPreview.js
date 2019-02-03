import React from 'react';

export default class SnippetPreview extends React.Component {
  render() {
    return (
      <div className={"yoast-wrapper"}>
        <div id="wpseo_meta"></div>
        <div className="label">Snippet preview</div>
        <div id="yoast-snippet">
          <section className="snippet-editor__preview">
            <div className="snippet_container snippet-editor__container"
                 id="title_container">
              <span className="title" id="snippet_title">Title</span>
            </div>
            <div className="snippet_container snippet-editor__container"
                 id="url_container">
              <cite className="url urlBase" id="snippet_citeBase">http://url</cite>
              <cite className="url" id="snippet_cite"></cite>
            </div>
            <div className="snippet_container snippet-editor__container"
                 id="meta_container">
              <span className="desc desc-default" id="snippet_meta">Meta Description</span>
            </div>
          </section>
        </div>
      </div>
    );
  }
}
