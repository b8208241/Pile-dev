import React from 'react';
import LinkifyIt from 'linkify-it';
import {Editor, EditorState, Modifier, RichUtils, convertToRaw} from 'draft-js';

export default class MainEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className={this.props.className}>
        <LinkIfEditor
          editorState={this.props.editorState}
          changeEditorState={this.props.changeEditorState}
          previewState={this.props.previewState}
          set_noneTextState={this.props.set_noneTextState}
          set_contentType={this.props.set_contentType}
          />
      </div>
    )
  }
}

class LinkIfEditor extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.handle_Paste_noneTextDetect = this.handle_Paste_noneTextDetect.bind(this);
  }

  handle_Paste_noneTextDetect(text, html) {
    if($.isEmptyObject(this.props.previewState)){
      const linkIf = LinkifyIt().match(text);
      if(linkIf !== 'undefined' && linkIf !== null){
        let link = text.substring(linkIf[0].index, linkIf[0].lastIndex+1);
        this.props.set_noneTextState("url", link);
      }else{
        this.props.set_contentType('text');
      }
    }
  }

  componentDidMount(){
    console.log('MainEditor did mount');
    this.editor.focus();
  }

  componentDidUpdate(){
    console.log('MainEditor did update');
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
      <div style={{}}>
        <Editor
          editorState={this.props.editorState}
          onChange={this.props.changeEditorState}
          ref={(element) => {this.editor = element;}}
          handlePastedText= {(text, html) => {this.handle_Paste_noneTextDetect(text, html);}}
        />
      </div>
    )
  }
}
