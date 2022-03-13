/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import { convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

const content = {
  entityMap: {},
  blocks: [{
    key: '637gr', text: 'Initialized from content state.', type: 'unstyled', depth: 0, inlineStyleRanges: [], entityRanges: [], data: {},
  }],
};

class EditorConvertToJSON extends Component {
  constructor(props) {
    super(props);
    const contentState = convertFromRaw(content);
    this.state = {
      contentState,
    };
  }

  onContentStateChange = (contentState) => {
    this.setState({
      contentState,
    });
  };

  render() {
    // eslint-disable-next-line no-unused-vars
    const { contentState } = this.state;
    return (
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
        onContentStateChange={this.onContentStateChange}
      />
    );
  }
}

export default EditorConvertToJSON;
