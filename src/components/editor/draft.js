import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// const content = {
//   entityMap: {},
//   blocks: [{
//   }],
// };

const MyEditor = () => {
  // eslint-disable-next-line no-unused-vars
  const [contentState, setContentState] = useState();

  const onContentStateChange = (state) => {
    setContentState(state);
  };

  return (
    <div>
      <Editor
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
        onContentStateChange={onContentStateChange}
        // wrapperStyle={<wrapperStyleObject>}
        // editorStyle={<editorStyleObject>}
        // toolbarStyle={<toolbarStyleObject>}
      />
    </div>
  );
};

export default MyEditor;
