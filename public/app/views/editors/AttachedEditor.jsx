import React from 'react';
import {Editor, EditorState, Modifier, RichUtils, convertToRaw} from 'draft-js';
import {StyleGroup} from '../generals/draft/StyleGroup.jsx'

export default class AttachedEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){

  }

  render(){
    return(
      <Editor
        editorState={this.props.editorState}
        onChange={this.props.changeEditorState}
        ref={(element)=> this.editor = element}
      />
    )
  }
}
