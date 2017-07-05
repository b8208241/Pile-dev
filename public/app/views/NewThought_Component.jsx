import React from 'react';
import {Editor, EditorState, ContentState} from 'draft-js';
import update from 'immutability-helper';
import NoteEditor from './editors/NoteEditor.jsx';
import style from '../../resources/css/style_NewThought.js';

class CommunityMember extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      style_viewPanel_member: this._style_viewPanel_member(),
      onMouseOver: false
    };
    this.changeEditorState = () => {};
    this._style_viewPanel_member = this._style_viewPanel_member.bind(this);
    this._blank_onMouseOver = this._blank_onMouseOver.bind(this);
  }

  _style_viewPanel_member(){
    let width = this.props.lengthRef[0],
        height = this.props.lengthRef[2],
        margin_vh = this.props.lengthRef[3],
        margin_vw = this.props.lengthRef[1],
        margin = margin_vw+'vw '+margin_vh+'vh',
        top = (margin_vh+(height/2))+((2*margin_vh)+height)*(this.props.position[0]),
        left = (margin_vw+(width/2))+((2*margin_vh)+height)*(this.props.position[1]);
    return(
      {
        width: width+"vw",
        height:height+"vh",
        margin: margin,
        position: "absolute",
        top: top+"vh",
        left: left+"vw",
        transform: "translate(-50%, -50%)",
        boxSizing: "border-box"
      }
    )
  }

  _blank_onMouseOver(staticStyle) {
    let style_onMouseOver = {
      boxSizing: "border-box",
      border: "1px solid #9C9898",
      boxShadow: "0 0 3px 1px"
    };
    return Object.assign({}, staticStyle, style_onMouseOver);
  }

  render(){
    const child = [];
    switch (this.props.type) {
      case "note":
        child.push(
          <div
            style={style.viewPanel_member_Note}>
            <Editor
              editorState={this.props.data.editor}
              onChange={this.changeEditorState}
              readOnly
            />
          </div>
        )
        break;
      default:
        break;
    }
    return(
      <div
        style={this.state.onMouseOver ? this._blank_onMouseOver(this.state.style_viewPanel_member):this.state.style_viewPanel_member}
        onMouseOver={(event)=>{event.preventDefault();event.stopPropagation();this.setState({onMouseOver: true})}}
        onMouseOut={(event)=>{event.preventDefault();event.stopPropagation();this.setState({onMouseOver: false})}}
        onClick={(event)=>{event.preventDefault();event.stopPropagation();this.props._handle_Click_viewMember(this.props.position)}}>
        {child}
      </div>
    )
  }
}

class NeighborMember extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      onMouseOver: false
    };
    this.changeEditorState = () => {};
  }

  render(){
    let blank_onMouseOver= function(propsStyle){
      let style_onMouseOver = {
        boxSizing: "border-box",
        border: "1px solid #9C9898",
        boxShadow: "0 0 3px 1px"
      };
      return Object.assign({}, propsStyle, style_onMouseOver);
    }
    let child = [];
    switch (this.props.type) {
      case "note":
        child.push(
          <Editor
            editorState={this.props.data.editor}
            onChange={this.changeEditorState}
            readOnly
          />
        )
        break;
      default:
        break;
    }
    return(
      <div
        style={this.state.onMouseOver ? blank_onMouseOver(this.props.style) : this.props.style}
        onMouseOver={(event)=>{event.preventDefault();event.stopPropagation();this.setState({onMouseOver: true})}}
        onMouseOut={(event)=>{event.preventDefault();event.stopPropagation();this.setState({onMouseOver: false})}}
        onClick={(event)=>{event.preventDefault();event.stopPropagation();this.props._handle_Click_Neighbor(this.props.position)}}>
        {child}
      </div>
    )
  }
}

class NeighborCommunity extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    const communityDOM = [];
    const currentPosition = this.props.currentPosition;
    let originRow = currentPosition[0],
        originColumn = currentPosition[1],
        _handle_Click_Neighbor = this.props._handle_Click_Neighbor;
    this.props.newThought.forEach(
      function(rowArr, rowNumber){
        rowArr.forEach(
          function(obj, columnNumber){
            let rowVar = (rowNumber-originRow);
            let columnVar = (columnNumber-originColumn);
            if(rowVar ===0 && columnVar===0){return};
            communityDOM.push(
              <NeighborMember
                key={"NeighborMember_"+rowNumber+columnNumber+"_"+obj.time}
                style={
                  obj.type==="note"
                  ? Object.assign({}, style.inputPanel_neighbor(rowVar, columnVar), style.input_Note)
                  : style.inputPanel_neighbor(rowVar, columnVar)
                }
                type={obj.type}
                data={obj}
                position={[rowNumber, columnNumber]}
                _handle_Click_Neighbor={_handle_Click_Neighbor}/>
            )
          }
        )
      }
    )
    return(
      <div
        style={style.inputPanel_neighborWindow}>
        <div
          style={style.inputPanel_neighborCommunity}>
          {communityDOM}
        </div>
      </div>
    )
  }
}

class CurrentEditing extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this._render_inputCurrent = this._render_inputCurrent.bind(this);
  }

  _render_inputCurrent(currentType){
    switch (currentType) {
      case "pasteCard":
        return (
          <div style={style.input_PasteCard}>
          </div>
        )
        break;
      default:
        return (
          <div style={style.input_Note}>
            <NoteEditor
              editorState={this.props.currentEditor}
              _changeEditorState={this.props._changeEditorState}
              _set_linkData={this.props._set_linkData}/>
          </div>
        )
        break;
    };
  }

  render(){
    return(
      <div style={style.inputPanel_CurrentEditing}>
        {this._render_inputCurrent(this.props.currentType)}
      </div>
    )
  }
}

export class InputPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <div
        style={style.inputPanel}>
        <CurrentEditing
          currentType={this.props.currentType}
          currentEditor={this.props.currentEditor}
          _changeEditorState={this.props._changeEditorState}
          _set_linkData={this.props._set_linkData}
          />
        <NeighborCommunity
          newThought={this.props.newThought}
          currentPosition={this.props.currentPosition}
          _handle_Click_Neighbor={this.props._handle_Click_Neighbor}/>
      </div>
    )
  }
}

export class ViewPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    const props = this.props;
    const communityDOM = [];
    const itemLengthRef = [10, 0.5, 11, 1];
    let _handle_Click_viewMember = this.props._handle_Click_viewMember;
    this.props.newThought.forEach(
      function(rowArr, rowNumber){
        rowArr.forEach(
          function(obj, columnNumber){
            communityDOM.push(
              <CommunityMember
                key={"CommunityMember_"+rowNumber+columnNumber+"_"+obj.time}
                position={[rowNumber, columnNumber]}
                lengthRef={itemLengthRef}
                type={obj.type}
                data={obj}
                _handle_Click_viewMember={_handle_Click_viewMember}/>
            )
          }
        )
      }
    )
    let _style_viewPanel= function(){
      let width = props.newThought[0].length*(itemLengthRef[1]*2+itemLengthRef[0]);
      let height = props.newThought.length*(itemLengthRef[3]*2+itemLengthRef[2]);
      return (
        {
          width: width+"vw",
          height: height+"vh",
          position: "relative",
          top: "0",
          left: "0",
          zIndex: "0"
        }
      )
    }
    return(
      <div
        style={_style_viewPanel()}>
        {communityDOM}
      </div>
    )
  }
}

export class OptionPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    let buttonOption = [];
    let i;
    for(i=0 ; i<4 ; i++){
      buttonOption.push(
        <svg
          key={"buttonOption_"+i}
          style={style.svg_buttonOption}
          onClick={this.props.editing ? null : this.props._handle_click_optionForNew}>
          <circle cx="50%" cy="50%" r="40%" style={{stroke: "rgb(251, 214, 92)", strokeWidth: "2", fill: "rgb(251, 214, 92)"}}></circle>
        </svg>
      )
    };
    return(
      <div
        style={style.optionPanel}>
        <div
          style={this.props.editing ? style.buttonOption_editing : style.buttonOption}>
          {buttonOption}
        </div>
        <div style={this.props.editing ? {display: "none"} : style.noteOption}/>
      </div>
    )
  }
}

export class ControllPanel extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
  }

  render(){
    return(
      <div
        style={this.props.style}>
        {
          this.props.editing
          ? <span
              style={style.controllPanel_viewWhole}
              onClick={this.props._handle_Click_controllToView}
              >whole</span>
          : <span
              style={style.controllPanel_edit}
              onClick={this.props._handle_Click_controllToEdit}
              >edit</span>
        }
        <span
          style={style.controllPanel_submit}
          onClick={this.props._handle_Click_Create}
          >save</span>
        <span
          style={style.controllPanel_giveup}
          onClick={this.props._handle_Click_GiveUp}>
          X
        </span>
      </div>
    )
  }
}
