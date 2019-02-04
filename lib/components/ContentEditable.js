import React, { useRef, useLayoutEffect } from 'react';

// TODO: Use the select API to ensure the cursor doesn't jump on rerender.
export default function ContentEditable(props) {
  const { children, onChange, ...rest } = props;
  console.log(children, rest);

  const el = useRef();
  const lastHTML = useRef(children);

  useLayoutEffect(() => {
    if (children !== el.current.innerHTML) {
      el.current.innerHTML = children;
    }
  });

  const emitChange = () => {
    const html = el.current.innerHTML;
    if (onChange && html !== lastHTML.current) {
      onChange({
        target: {
          value: html,
        }
      });
    }
    lastHTML.current = html;
  };

  return (
    <div
      ref={el}
      onInput={emitChange}
      onBlur={emitChange}
      contentEditable={true}
      // suppressContentEditableWarning={true}
      // dangerouslySetInnerHTML={{__html: children}}
      {...rest} >
      {children}
    </div>
  )
}
