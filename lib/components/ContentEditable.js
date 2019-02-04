import React, { useRef, useState, useLayoutEffect } from 'react';

export default function ContentEditable(props) {
  const { value, onChange, ...rest } = props;

  const el = useRef();
  const [editorState, setEditorState] = useState({
    cursor: 0,
    value,
  });

  // Preserve the cursor position after an update.
  useLayoutEffect(() => {
    // Abort if we're not properly mounted yet.
    if (!el.current || !el.current.firstChild) {
      return;
    }

    window.getSelection().collapse(el.current.firstChild, editorState.cursor);
  }, [editorState]);

  // If we've received props that differ from our current editor value then we
  // change our editor to match what we're given.
  if (editorState.value !== value) {
    setEditorState({
      cursor: editorState.cursor,
      value
    });
  }

  // When the value of the editor changes, update our parent component.
  const handleChange = (e) => {
    const newValue = e.target.innerText;

    if (newValue !== editorState.value) {
      setEditorState({
        cursor: window.getSelection().getRangeAt(0).startOffset,
        value: newValue,
      });

      onChange(newValue);
    }
  };

  return (
    <div
      {...rest}
      ref={el}
      onInput={handleChange}
      contentEditable={true}
      suppressContentEditableWarning={true}
      dangerouslySetInnerHTML={{__html: value}}></div>
  )
}
