import React from 'react';
import {Editor, EditorState, ContentState, convertToRaw, convertFromRaw, Modifier} from 'draft-js';
import LinkifyIt from 'linkify-it';

export default class NoteEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.handle_Paste_linkDetect = this.handle_Paste_linkDetect.bind(this);
  }

  handle_Paste_linkDetect(text, html) {
    const linkIf = LinkifyIt().match(text);
    if(linkIf !== 'undefined' && linkIf !== null){
      let link = text.substring(linkIf[0].index, linkIf[0].lastIndex+1);
      this.props._set_linkData(link);
    }
  }

  componentDidMount(){
    console.log('NoteEditor did mount');
    this.editor.focus();
  }

  componentDidUpdate(){
    /*
    const {editorState} = this.props;
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();
    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);
    const blockText = currentContentBlock.getText();
    const linkIf = LinkifyIt().match(blockText);
    if(linkIf !== 'undefined' && linkIf !== null){
      let link = blockText.substring(linkIf[0].index, linkIf[0].lastIndex+1);
      this.props.set_UrlState(link);
    }*/
  }

  render(){
    return(
      <div
        style={{width: "100%", height: "100%"}}
        onClick={(event)=>{event.preventDefault();event.stopPropagation();this.editor.focus();}}>
        <Editor
          editorState={this.props.editorState}
          onChange={this.props._changeEditorState}
          ref={(element) => {this.editor = element;}}
          handlePastedText= {(text, html) => {this.handle_Paste_linkDetect(text, html);}}
        />
      </div>
    )
  }
}
