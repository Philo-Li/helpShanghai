import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

// eslint-disable-next-line no-unused-vars
const MyEditor = ({ editorState, setEditorState }) => {
  // eslint-disable-next-line no-unused-vars
  const [contentState, setContentState] = useState();

  if (!editorState) return null;

  const onContentStateChange = (state) => {
    setContentState(state);
    setEditorState(state);
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
        initialContentState={editorState}
        // defaultEditorState={sampleEditorContent}
        onContentStateChange={onContentStateChange}
        // wrapperStyle={<wrapperStyleObject>}
        // editorStyle={<editorStyleObject>}
        // toolbarStyle={<toolbarStyleObject>}
      />
    </div>
  );
};

export default MyEditor;
