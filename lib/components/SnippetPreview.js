import React from 'react';
import ContentEditable from './ContentEditable';

// TODO: The title and description are editable but not yet saved in Drupal.
export default function SnippetPreview(props) {
  return (
    <div className={"yoast-wrapper"}>
      <div className="label">Snippet preview</div>
      <section className="snippet-editor__preview">
        <div className="snippet_container snippet-editor__container">
          <ContentEditable
            onChange={props.updateTitle}
            className="title editable"
            value={props.title}
          />
        </div>
        <div className="snippet_container snippet-editor__container">
          <cite className="url urlBase">{props.baseUrl}</cite>
          <cite className="url">{props.url}</cite>
        </div>
        <div className="snippet_container snippet-editor__container" id="meta_container">
          <ContentEditable
            onChange={props.updateDescription}
            className="desc desc-default editable"
            value={props.description}
          />
        </div>
      </section>
    </div>
  );
}
