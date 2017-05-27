import React from 'react';
import {Editor, EditorState, Modifier, RichUtils, convertToRaw} from 'draft-js';
import {StyleGroup} from '../generals/draft/StyleGroup.jsx'

export default class AttachedEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <div>
        <StyleGroup
          editorState={this.props.editorState}
          onChange={this.props.changeEditorState}/>
        <div style={{}}>
          <Editor
            editorState={this.props.editorState}
            onChange={this.props.changeEditorState}
          />
        </div>
      </div>
    )
  }
}
