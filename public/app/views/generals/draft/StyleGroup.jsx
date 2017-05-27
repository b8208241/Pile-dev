import React from 'react';
import {RichUtils} from 'draft-js';

export class StyleGroup extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.on_BoldClicked = (event) => {event.preventDefault(); event.stopPropagation(); this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'BOLD'))};
    this.on_ItalicClicked = (event) => {event.preventDefault(); event.stopPropagation(); this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'ITALIC'))};
    this.on_UnderlineClicked = (event) => {event.preventDefault(); event.stopPropagation(); this.props.onChange(RichUtils.toggleInlineStyle(this.props.editorState, 'UNDERLINE'))};
    this.on_UploadClicked;
  }

  render(){
    return(
      <div className="topic-draft-stylegroup">
        <span onClick={this.on_BoldClicked} style={{marginLeft: '5%', fontWeight: 'bold', color: '#9C9898'}}>B</span>
        <span onClick={this.on_ItalicClicked} style={{marginLeft: '5%', fontStyle: 'italic', color: '#9C9898'}}>I</span>
        <span onClick={this.on_UnderlineClicked} style={{marginLeft: '5%', textDecoration: 'underline', color: '#9C9898'}}>U</span>
        <span onClick={this.on_UploadClicked}></span>
      </div>
    )
  }
}
