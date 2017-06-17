import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import UserPiles from './UserPiles.jsx';
import PasteCard from './editors/PasteCard.jsx';
import IssuePanel from './generals/IssuePanel.jsx';
import {pileSubmit} from '../reduxsaga/dispatch.js';

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false,
      issues: false,
      issueCreate: false,
      renderPiles: false,
      renderTop: true
    };
    this.handle_click_crystal = (event) => {event.preventDefault();event.stopPropagation();this.setState({issues: true, editing: false, renderPiles: false, renderTop: true})};
    this.handle_click_input = (event) => {event.preventDefault();event.stopPropagation();this.setState({issues: false, editing: "note", renderTop: true})};
    this.handle_click_inputOption = (event) => {event.preventDefault();event.stopPropagation();this.setState({issues: false, editing: "pasteCard", renderTop: true})};
    this.handle_click_issueCreate = (event) => {event.preventDefault();event.stopPropagation();this.setState({issues: true, editing: false, issueCreate: true, renderPiles: false, renderTop: true})};
    this.create_pile = this.create_pile.bind(this);
  }

  create_pile(rawContent, urlSiteInfo, id, time, contentType, tagArr, issueArr) {
    this.props.dispatch(pileSubmit({rawContent: rawContent, urlSiteInfo: urlSiteInfo, id: id, time: time, contentType: contentType, tagArr: tagArr, issueArr: issueArr}));
  }

  componentDidMount(){

  }

  render(){
    const indexStyle = {
      width: "90%",
      height: "90%",
      position: "relative",
      zIndex: "0"
    }
    const topStyle = {
      width: "100%",
      height: "100%",
      position: "absolute",
      left: "2%",
      boxSizing: "border-box",
      backgroundColor: "#FFFFFF",
      boxShadow: "0px 10px 10px -10px, 0px -10px 10px -10px",
      zIndex: "1"
    }
    const navPanel = {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignContent: "center",
      width: "50%",
      height: "45%",
      position: "relative",
      top: "20%",
      left: "52%",
      transform: "translate(-50%, 0)"
    }
    const navEditingPanel = {
      display: "flex",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "flex-start",
      width: "50%",
      height: "35%",
      position: "relative",
      top: "2%",
      left: "52%",
      transform: "translate(-50%, 0)"
    }
    const nav_CrystalStyle = {
      margin: "5% 10% 8% 10%",
      cursor: "pointer"
    }
    const nav_InputOptionStyle = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "75%",
      height: "30%"
    }
    const nav_NoteStyle = {
      width: "25%",
      height: "20%",
      margin: "2% 10%",
      boxSizing: "border-box",
      borderBottom: "1px solid #9C9898",
      cursor: "text"
    }
    const input_PasteCard = {
      width: "35%",
      minHeight: "35vh",
      maxHeight: "50vh",
      position: "relative",
      top: "-16%",
      left: "50%",
      transform: "translate(-45%, 0)",
      backgroundColor: "#FFFFFF",
      boxShadow: "0px 0px 5px 1px",
      overflowY: "auto"
    }
    const issuesPanelStyle ={
      width: "100%",
      height: "60%",
      position: "absolute",
      top: "22%",
      left: "50%",
      transform: "translate(-50%, 0)",
    }
    const issueCreateStyle = {
      width: "35%",
      height: "20%",
      position: "relative",
      left: "52%",
      transform: "translate(-50%, 0)",
      backgroundColor: "#FFFFFF",
      boxShadow: "0 0 5px 0px",
      overflowY: "auto",
      cursor: "text"
    }
    const svg_IssueCreateStyle = {
      width: "5%",
      height: "20%",
      position: "relative",
      left: "52%",
      transform: "translate(-50%, 0)",
      cursor: "pointer"
    }
    const svg_OptionStyle_Input = {
      width: "16%",
      height: "100%",
      margin: "0 2%",
      cursor: "pointer"
    }
    const optionInput = [];
    let i;
    for(i=0 ; i<4 ; i++){
      optionInput.push(
        <svg
          key={"optionInput_"+i}
          style={svg_OptionStyle_Input}
          onClick={this.handle_click_inputOption}>
          <circle cx="50%" cy="50%" r="40%" style={{stroke: "#EEEEEE", strokeWidth: "2", fill: "#EEEEEE"}}></circle>
        </svg>
      )
    }
    return(
      <div style={indexStyle}>
        {
          this.state.renderTop &&
          <div style={topStyle}>
            <div style={!this.state.editing ? navPanel : navEditingPanel}>
              <div
                style={nav_CrystalStyle}
                onClick={this.handle_click_crystal}>
                (crystal)
              </div>
              <div
                style={nav_InputOptionStyle}>
                {optionInput}
              </div>
              <div
                style={nav_NoteStyle}
                onClick={this.handle_click_input}/>
            </div>
            {
              this.state.issues &&
              <div style={issuesPanelStyle}>
                {
                  this.state.issueCreate &&
                  <div style={issueCreateStyle}>
                    <div style={{width: "94%", height: "80%", margin: "0 3%", boxSizing: "border-box"}}></div>
                    <div style={{position: "absolute", bottom: "1%", right: "2%", fontSize: "1.2rem", fontWeight: "500", color: "#9C9898", cursor: "pointer"}}>Start</div>
                  </div>
                }
                <IssuePanel
                  style={{display: "flex", justifyContent: "center", alignContent: "center", minHeight: "35%", position: "relative"}}
                  issues={this.props.issues}/>
                <svg
                  style={svg_IssueCreateStyle}
                  onClick={this.handle_click_issueCreate}>
                  <circle cx="50%" cy="50%" r="40%" style={{stroke: "#9C9898", strokeWidth: "2", fillOpacity: "0.0"}}/>
                </svg>
              </div>
            }
            {
              this.state.editing==="pasteCard" &&
                <div style={input_PasteCard}>
                  <PasteCard
                    create_pile={this.create_pile}/>
                  <span
                    style={{display: "inline-block", width: "30%", marginTop: "2%", fontWeight: "normal", color: "#9C9898", cursor: "pointer"}}
                    onClick={(event) => {event.preventDefault();event.stopPropagation();this.setState({editing: false, renderPiles: false})}}>Cancel</span>
                </div>
            }
          </div>
        }
        {
          this.state.renderPiles &&
          <UserPiles
            allepiles={this.props.allepiles}/>
        }
      </div>
    )
  }
}


function mapStateToProps (state) {
  return {
    allepiles: state.allepiles,
    types: state.types,
    tags: state.tags,
    issues: state.issues,
    status: state.status,
    others: state.others
  }
}

export default connect(mapStateToProps)(
  Index
)
