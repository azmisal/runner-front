import React, { useState } from 'react';
import { Controlled as ControlledEditor } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css'; 

const CodeEditor = ({ value, onChange }) => {
//   const [controlledValue, setControlledValue] = useState(value);

//   const handleChange = (editor, data, value) => {
//     setControlledValue(value);
//     onChange(value);
//   };

  return (
    <div className="code-editor">
      <ControlledEditor
        // onBeforeChange={handleChange}
        // value={controlledValue}
        options={{
          lineNumbers: true,
          theme: 'material', // You can change the theme here
          mode: 'javascript' // You can change the language mode here
        }}
      />
    </div>
  );
};

export default CodeEditor;
