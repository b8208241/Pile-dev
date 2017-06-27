import React from 'react';
import {Editor, EditorState, ContentState, convertToRaw, convertFromRaw} from 'draft-js';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import PasteCard from './editors/PasteCard.jsx';
import NoteEditor from './editors/NoteEditor.jsx';
import {pluginsDecoratorCreate} from './generals/draft/pluginsDecoratorCreate.jsx';

const linkifyPlugin = createLinkifyPlugin({target: '_blank'});
const pluginDecoratorsOnlyLink = pluginsDecoratorCreate([linkifyPlugin]);

export default class NewThought extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      currentType: "",
      currentEditor: "",
      linkData: "",
      topState: "",
      rightState: "",
      bottomState: "",
      leftState: "",
      leftTopState: "",
      rightTopState: "",
      lefBottomState: "",
      rightBottomState: ""
    };
    this.changeEditorState = (newState) => this.setState({currentEditor: newState});
    this.set_linkData = (link) => this.setState({linkData: link});
    this.handle_click_optionPanel = (event) => {event.preventDefault();event.stopPropagation();this.setState({editing: true, currentType: "pasteCard"})};
    this.handle_click_optionNote = this.handle_click_optionNote.bind(this);
    this.handle_Click_Create = this.handle_Click_Create.bind(this);
    this.handle_Click_Neighbor = this.handle_Click_Neighbor.bind(this);
  }

  handle_click_optionNote(event){
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      editing: true,
      currentType: "note",
      currentEditor: EditorState.createEmpty(pluginDecoratorsOnlyLink),
      topState: EditorState.createEmpty(pluginDecoratorsOnlyLink),
      rightState: EditorState.createEmpty(pluginDecoratorsOnlyLink),
      bottomState: EditorState.createEmpty(pluginDecoratorsOnlyLink),
      leftState: EditorState.createEmpty(pluginDecoratorsOnlyLink),
      leftTopState: EditorState.createEmpty(pluginDecoratorsOnlyLink),
      rightTopState : EditorState.createEmpty(pluginDecoratorsOnlyLink),
      leftBottomState : EditorState.createEmpty(pluginDecoratorsOnlyLink),
      rightBottomState : EditorState.createEmpty(pluginDecoratorsOnlyLink)
    });
    this.props.set_IndexStatus("input");
  }

  handle_Click_Neighbor(orientation){
    let target = orientation.concat("State");
    let currentTargetContent = this.state[target];
    let top, right, bottom, left, leftTop, rightTop, leftBottom, rightBottom;
    switch (orientation.length) {
      case 3:
        bottom = this.state.currentEditor;
        break;
      case 4:
        right = this.state.currentEditor;
        break;
      case 5:
        left = this.state.currentEditor;
        break;
      case 6:
        top = this.state.currentEditor;
        break;
      default:

        break;
    };
    this.setState({
      currentEditor: currentTargetContent,
      topState: top,
      rightState: right,
      bottomState: bottom,
      leftState: left
    })
  }

  handle_Click_Create(event){
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

  componentWillMount(){

  }

  componentDidMount(){

  }

  render() {
    let changeEditorState = this.changeEditorState;
    let handle_Click_Neighbor = this.handle_Click_Neighbor;
    let set_linkData = this.set_linkData;
    const state = this.state;
    const style = {
      optionNote: {
        width: "40%",
        height: "9%",
        position: "absolute",
        top: "48%",
        left: "50%",
        transform: "translate(-50%, 0)",
        boxSizing: "border-box",
        borderBottom: "1px solid #9C9898",
        cursor: "text"
      },
      optionPanel: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "16%",
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, 0)"
      },
      optionPanel_editing: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "75%",
        height: "10%",
        position: "absolute",
        top: "5%",
        left: "60%",
        transform: "translate(-50%, 0)"
      },
      inputPanel: {
        width: "64%",
        minHeight: "42%",
        maxHeight: "72.25%",
        position: "absolute",
        top: "20%",
        left: "18%",
        overflow: "visible"
      },
      inputPanel_submit: {
        display: "inline-block",
        width: "15%",
        position: "absolute",
        top: "122%",
        left: "106%",
        fontWeight: "bold",
        fontSize: "3vh",
        color: "#9C9898",
        cursor: "pointer",
        zIndex: "1"
      },
      inputPanel_current: {
        width: "96%",
        minHeight: "37vh",
        margin: "0 2%",
        padding: "2%",
        boxSizing: "border-box",
        cursor: "text"
      },
      inputPanel_currentWindow: {
        width: "136%",
        height: "144%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        overflow: "hidden",
        zIndex: "-1"
      },
      inputPanel_community: {
        width: "223%",
        height: "211%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
      },
      inputPanel_neighbor: {
        top: {width: "32%", height: "33%", position: "absolute", top: "0", left: "50%", transform: "translate(-50%, 0)"},
        left: {width: "32%", height: "33%", position: "absolute", left: "0", top: "50%", transform: "translate(0, -50%)"},
        right: {width: "32%", height: "33%", position: "absolute", right: "0", top: "50%", transform: "translate(0, -50%)"},
        bottom: {width: "32%", height: "33%", position: "absolute", bottom: "0", left: "50%", transform: "translate(-50%, 0)"}
      },
      input_Note: {
        backgroundColor: "rgb(255, 255, 200)",
        boxShadow: "1px 1px 5px 1px",
      },
      input_PasteCard: {
        width: "35%",
        minHeight: "35vh",
        maxHeight: "50vh",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 0px 5px 1px",
        overflowY: "auto"
      },
      svg_optionPanel: {
        width: "16%",
        height: "100%",
        margin: "0 2%",
        cursor: "pointer"
      }
    }
    let inputPanel_community_member = ["leftTop", "top", "rightTop", "left", "right", "leftBottom", "bottom", "rightBottom"];
    const optionPanel = [];
    let i;
    for(i=0 ; i<4 ; i++){
      optionPanel.push(
        <svg
          key={"optionPanel_"+i}
          style={style.svg_optionPanel}
          onClick={this.handle_click_optionPanel}>
          <circle cx="50%" cy="50%" r="40%" style={{stroke: "#EEEEEE", strokeWidth: "2", fill: "#EEEEEE"}}></circle>
        </svg>
      )
    };

    return(
      <div style={{
          width: "40%",
          height: "100%",
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translate(-50%, 0)"
        }}>
        <div
          style={this.state.editing ? style.optionPanel_editing:style.optionPanel}>
          {optionPanel}
        </div>
        {
          state.editing ?
          <div
            style={style.inputPanel}>
            {
              ((currentType) => {
                switch (currentType) {
                  case "pasteCard":
                    return (
                      <div style={style.input_PasteCard}>

                      </div>
                    )
                    break;
                  default:
                    return (
                      <div style={Object.assign({}, style.inputPanel_current, style.input_Note)}>
                        <NoteEditor
                          editorState={state.currentEditor}
                          changeEditorState={changeEditorState}
                          set_linkData={set_linkData}/>
                      </div>
                    )
                    break;
                };
              })(state.currentType)
            }
            <div
              style={style.inputPanel_currentWindow}>
              <div
                style={style.inputPanel_community}>
                {
                  inputPanel_community_member.map(
                    function(position, index){
                      let positionName = position+"State";
                      return (
                        <NeighborEditor
                          style={state[positionName].getCurrentContent().hasText() ? Object.assign({}, style.inputPanel_neighbor[position], style.input_Note) : style.inputPanel_neighbor[position]}
                          editorState={state[positionName]}
                          orientation={position}
                          handle_Click_Neighbor={handle_Click_Neighbor}/>
                      )
                    }
                  )
                }
              </div>
            </div>
            <span
              style={style.inputPanel_submit}
              onClick={this.handle_Click_Create}
              >save</span>
          </div>
          : <div
              style={style.optionNote}
              onClick={this.handle_click_optionNote}/>
        }
      </div>
    )
  }
}

class NeighborEditor extends React.Component {
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
    return(
      <div
        style={this.state.onMouseOver ? blank_onMouseOver(this.props.style) : this.props.style}
        onMouseOver={(event)=>{event.preventDefault();event.stopPropagation();this.setState({onMouseOver: true})}}
        onMouseOut={(event)=>{event.preventDefault();event.stopPropagation();this.setState({onMouseOver: false})}}
        onClick={(event)=>{event.preventDefault();event.stopPropagation();this.props.handle_Click_Neighbor(this.props.orientation)}}>
        <Editor
          editorState={this.props.editorState}
          onChange={this.changeEditorState}
          readOnly
        />
      </div>
    )
  }
}
