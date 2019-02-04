import React from 'react';
import ContentEditable from './ContentEditable';

export default function SnippetPreview(props) {
  const title =
    props.editTitle ?
      <ContentEditable
        onChange={props.updateTitle}
        className={"title editable"}
        value={props.title}
      /> : <span className={"title"}>{props.title}</span>;

  const description =
    props.editDescription ?
      <ContentEditable
        onChange={props.updateDescription}
        className="desc desc-default editable"
        value={props.description}
      /> : <span className={"desc desc-default"}>{props.description}</span>;

  return (
    <div className={"yoast-wrapper"}>
      <div className="label">Snippet preview</div>
      <section className="snippet-editor__preview">
        <div className="snippet_container snippet-editor__container">
          {title}
        </div>
        <div className="snippet_container snippet-editor__container">
          <cite className="url urlBase">{props.baseUrl}</cite>
          <cite className="url">{props.url}</cite>
        </div>
        <div className="snippet_container snippet-editor__container" id="meta_container">
          {description}
        </div>
      </section>
    </div>
  );
}
