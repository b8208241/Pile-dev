import React from 'react';
import {Editor, EditorState, ContentState, convertToRaw, convertFromRaw} from 'draft-js';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import update from 'immutability-helper';
import {InputPanel, ViewPanel, ControllPanel, OptionPanel} from './NewThought_Component.jsx';
import style from '../../resources/css/style_NewThought.js';
import PasteCard from './editors/PasteCard.jsx';
import {pluginsDecoratorCreate} from './generals/draft/pluginsDecoratorCreate.jsx';

const linkifyPlugin = createLinkifyPlugin({target: '_blank'});
const pluginDecoratorsOnlyLink = pluginsDecoratorCreate([linkifyPlugin]);

export default class NewThought extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      view: false,
      issueEditing: false,
      issueName: "",
      newThought: [],
      currentPosition: [],
      currentType: "",
      currentEditor: "",
      linkData: ""
    };
    this._changeEditorState = (newState) => this.setState({currentEditor: newState});
    this._set_linkData = (link) => this.setState({linkData: link});
    this._handle_click_optionForNew = this._handle_click_optionForNew.bind(this);
    this._handle_Click_Neighbor = this._handle_Click_Neighbor.bind(this);
    this._handle_Click_viewMember = this._handle_Click_viewMember.bind(this);
    this._handle_Click_controllToView = this._handle_Click_controllToView.bind(this);
    this._handle_Click_controllToEdit = this._handle_Click_controllToEdit.bind(this);
    this._handle_Click_Create = this._handle_Click_Create.bind(this);
    this._handle_Click_GiveUp = this._handle_Click_GiveUp.bind(this);
  }

  _handle_click_optionForNew(event){
    event.preventDefault();
    event.stopPropagation();
    let defaultArr = [];
    let i;
    for(i=0;i<3;i++){
      let rowArr = [];
      let j;
      for(j=0;j<3;j++){
        let d = new Date();
        let time = d.getTime();
        if(i===1 && j===1){
          rowArr.push(
            {
              time: time,
              type: "note",
              editor: EditorState.createEmpty(pluginDecoratorsOnlyLink),
              linkData: ""
            }
          );
          continue;
        }
        rowArr.push(
          {
            time: time,
            type: "blank"
          }
        )
      };
      defaultArr.push(rowArr);
    };
    this.setState({
      editing: true,
      newThought: defaultArr,
      currentPosition: [1, 1],
      currentType: defaultArr[1][1].type,
      currentEditor: defaultArr[1][1].editor
    });
    this.props.set_IndexStatus("input");
  }

  _handle_Click_Neighbor(position){
    let state = this.state;
    let currentRow = state.currentPosition[0];
    let currentColumn = state.currentPosition[1];
    const newThoughtState = update(state.newThought, {
      [currentRow]: {
        [currentColumn]: {
          $merge: {
            type:state.currentType,
            editor: state.currentEditor
          }
        }
      }
    });
    if(newThoughtState[position[0]][position[1]].type==="blank"){
      newThoughtState[position[0]][position[1]].type = "note";
      newThoughtState[position[0]][position[1]].editor = EditorState.createEmpty(pluginDecoratorsOnlyLink);
    }
    if(
      position[0]*position[1]===0
      || position[0]===newThoughtState.length-1
      || position[1]===newThoughtState[position[0]].length-1
    ){
      let d = new Date();
      let time = d.getTime();
      let blankNeighbor = {
        time: time,
        type: "blank"
      };
      if(position[0]===0 || position[0]===newThoughtState.length-1){
        let rowArr=[];
        let j;
        for(j=0;j<newThoughtState[position[0]].length;j++){
          rowArr.push(blankNeighbor)
        };
        if(position[0]===0){
          newThoughtState.unshift(rowArr);
          position[0] +=1;
        }else{
          newThoughtState.push(rowArr);
        }
      }else if(position[1]===0 || position[1]===newThoughtState[position[0]].length-1){
        let i;
        for(i=0;i<newThoughtState.length;i++){
          position[1]===0 ? newThoughtState[i].unshift(blankNeighbor) : newThoughtState[i].push(blankNeighbor)
        }
        if(position[1]===0){
          position[1] += 1;
        }
      }
    }

    this.setState({
      newThought: newThoughtState,
      currentPosition: position,
      currentType: newThoughtState[position[0]][position[1]].type,
      currentEditor: newThoughtState[position[0]][position[1]].editor
    })
  }

  _handle_Click_viewMember(position){
    let rowNumber = position[0],
        columnNumber = position[1],
        currentType, currentEditor, linkData,
        targetItem = this.state.newThought[rowNumber][columnNumber];
    if(targetItem.type === "blank"){
      Object.assign(
        targetItem,
        {
          type: "note",
          editor: EditorState.createEmpty(pluginDecoratorsOnlyLink),
          linkData: ""
        });
    }
    currentType = targetItem.type;
    currentEditor = targetItem.editor;
    linkData = targetItem.linkData;

    this.setState({
      editing: true,
      view: false,
      newThought: this.state.newThought,
      currentPosition: position,
      currentType: currentType,
      currentEditor: currentEditor,
      linkData: linkData
    })
  }

  _handle_Click_controllToView(event){
    event.preventDefault();
    event.stopPropagation();
    let currentRow = this.state.currentPosition[0];
    let currentColumn = this.state.currentPosition[1];
    let currentType = this.state.currentType;
    let currentEditor = this.state.currentEditor;
    const newThoughtState = update(this.state.newThought, {
      [currentRow]: {
        [currentColumn]: {
          $merge: {
            type: currentType,
            editor: currentEditor
          }
        }
      }
    });

    this.setState({
      newThought: newThoughtState,
      editing: false,
      view: true
    })
  }

  _handle_Click_controllToEdit(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      editing: true,
      view: false
    })
  }

  _handle_Click_Create(event){
    event.preventDefault();
    event.stopPropagation();
    let rawContent = convertToRaw(this.state.mainEditorState.getCurrentContent());
    let date = new Date();
    let time = date.getTime();
    //beneath var need to be modified, delete them and modify the saga-reducer
    let previewState = {};
    let contentType = ""
    let tagArr = [];
    let issueArr = [];

    this.props.create_pile(
      rawContent,
      previewState,
      "pile_"+time,
      time,
      contentType,
      tagArr,
      issueArr);
    this.setState({
      mainEditorState: EditorState.push(this.state.mainEditorState, ContentState.createFromText('')),
      linkData: ""
    });
  }

  _handle_Click_GiveUp(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      editing: false,
      view: false,
      newThought: [],
      currentPosition: [],
      currentType: "",
      currentEditor: "",
      linkData: ""
    })
    this.props.set_IndexStatus("");
  }

  componentWillMount(){

  }

  componentDidMount(){

  }

  render() {
    return(
      <div style={style.newThought}>
        {
          !this.state.view &&
          <OptionPanel
            editing={this.state.editing}
            _handle_click_optionForNew={this._handle_click_optionForNew}/>
        }
        {
          this.state.editing &&
          <div
            style={style.newThought_Editing}>
            <InputPanel
              newThought={this.state.newThought}
              currentType={this.state.currentType}
              currentPosition={this.state.currentPosition}
              currentEditor={this.state.currentEditor}
              _handle_Click_Neighbor = {this._handle_Click_Neighbor}
              _changeEditorState={this._changeEditorState}
              _set_linkData={this._set_linkData}/>
            <ControllPanel
              style={style.controllPanel_Editing}
              editing={this.state.editing}
              _handle_Click_controllToView={this._handle_Click_controllToView}
              _handle_Click_Create={this._handle_Click_Create}
              _handle_Click_GiveUp={this._handle_Click_GiveUp}/>
          </div>
        }
        {
          this.state.view &&
          <div
            style={style.newThought_View}>
            <ViewPanel
              newThought={this.state.newThought}
              currentPosition={this.state.currentPosition}
              _handle_Click_viewMember={this._handle_Click_viewMember}/>
            <ControllPanel
              style={style.controllPanel_View}
              editing={this.state.editing}
              _handle_Click_controllToEdit={this._handle_Click_controllToEdit}
              _handle_Click_Create={this._handle_Click_Create}
              _handle_Click_GiveUp={this._handle_Click_GiveUp}/>
          </div>
        }
      </div>
    )
  }
}
