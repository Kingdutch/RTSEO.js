import React from 'react';
import ContentEditable from './ContentEditable';

export default function SnippetPreview(props) {
  return (
    <div className={"yoast-wrapper"}>
      <div className="label">Snippet preview</div>
      <section className="snippet-editor__preview">
        <div className="snippet_container snippet-editor__container">
          <ContentEditable className="title">{props.title}</ContentEditable>
        </div>
        <div className="snippet_container snippet-editor__container">
          <cite className="url urlBase">{props.baseUrl}</cite>
          <cite className="url">{props.url}</cite>
        </div>
        <div className="snippet_container snippet-editor__container" id="meta_container">
          <ContentEditable className="desc desc-default">{props.description}</ContentEditable>
        </div>
      </section>
    </div>
  );
}
