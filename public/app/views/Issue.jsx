import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';
import UserPiles from './UserPiles.jsx';
import UrlPreview from './generals/UrlPreview.jsx';
import IssuePanel from './generals/IssuePanel.jsx';
import EditorPanel from './editors/EditorPanel.jsx';
import DisplayEditor from './editors/DisplayEditor.jsx';
import {pileSubmit} from '../reduxsaga/dispatch.js';

class Issue extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editing: false
    };
    this.handle_click_crystal = (event) => {event.preventDefault();event.stopPropagation();this.setState({editing: false})};
    this.handle_click_input = (event) => {event.preventDefault();event.stopPropagation();this.setState({editing: true})};
    this.create_pile = this.create_pile.bind(this);
  }

  create_pile(rawContent, urlSiteInfo, id, time, contentType, tagArr, issueArr) {
    this.props.dispatch(pileSubmit({rawContent: rawContent, urlSiteInfo: urlSiteInfo, id: id, time: time, contentType: contentType, tagArr: tagArr, issueArr: issueArr}));
  }

  render(){
    const issueStyle = {
      width: "90%",
      height: "90%",
      position: "relative",
      zIndex: "0"
    }
    const crystalStyle = {
      position: "absolute",
      top: "0",
      left: "5%",
      transform: "translate(-50%, 0)"
    }
    const issueNameStyle = {
      position: "absolute",
      top: "0",
      right: "0"
    }
    const issuesAsideStyle ={
      width: "5%",
      height: "60%",
      position: "absolute",
      top: "50%",
      left: "1%",
      transform: "translate(0, -50%)",
    }
    const inputEntryStyle = {
      width: "20%",
      height: "5%",
      position: "absolute",
      top: "5%",
      right: "0%",
      backgroundColor: "#FFFFFF",
      boxShadow: "0 0 5px 0px"
    }
    const inputPanelStyle = {
      width: "35%",
      maxHeight: "50vh",
      position: "absolute",
      top: "25%",
      left: "52%",
      transform: "translate(-50%, 0)",
      backgroundColor: "#FFFFFF",
      boxShadow: "0 0 5px 0px",
      overflowY: "auto"
    }

    return(
      <div style={issueStyle}>
        <div
          style={crystalStyle}
          onClick={this.handle_click_crystal}>
          (crystal)
        </div>
        <aside style={issuesAsideStyle}>
          <IssuePanel
            style={{}}
            issues={this.props.issues}/>
        </aside>
        <h3 style={issueNameStyle}>{this.props.params.issueName}</h3>
        {
          this.state.editing ?
            <div style={inputPanelStyle}>
              <EditorPanel
                create_pile={this.create_pile}/>
              <span
                style={{display: "inline-block", width: "30%", marginTop: "2%", fontWeight: "normal", color: "#9C9898", cursor: "pointer"}}
                onClick={(event) => {event.preventDefault();event.stopPropagation();this.setState({editing: false, renderPiles: false})}}>Cancel</span>
            </div>
            : <div
                style={inputEntryStyle}
                onClick={this.handle_click_input}>
              </div>
        }
      </div>
    )
  }
}

class UserPilesList extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
    this.attach_pile = this.attach_pile.bind(this);
  }

  attach_pile(event) {
    event.preventDefault();
    event.stopPropagation();
    let id = $(event.target).attr('data-id-pile');
    this.props.attach_pile(id);
  }

  render(){
    let issueName = this.props.currentIssue;
    let attach_pile = this.attach_pile;
    let piles = [];
    $.each(this.props.allepiles, function(key, value){
      piles.unshift(
        <li
          key={"key_"+issueName+String(value.id)}
          id={"id_"+issueName+String(value.id)}
          style={{width: "90%", height: "33%", margin: "2% 1%", padding: "0 1%", position: "relative", overflowY: "hidden", boxShadow: "0 0 5px"}}>
         <UrlPreview
            contentType={value.contentType}
            previewState={value.urlSiteInfo}
            />
          <DisplayEditor
            className=''
            rawContent={value.rawContent}/>
          <span
            data-id-pile={value.id}
            style={{position: "absolute", bottom: "2%", right: "5%", cursor: "pointer"}}
            onClick={attach_pile}>attach</span>
        </li>
      );
    });

    return(
      <ul style={{width: "25%", height: "65%", position: "fixed", left: "25%", top: "15%", backgroundColor: "#FFFFFF", boxShadow: "0 0 5px 2px", listStyle: "none"}}>
        {piles}
      </ul>
    )
  }
}

function renderDOMPile(pileData, location){
  let XSsize = {maxWidth: "60%", height: "65%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
  let Ssize = {maxWidth: "75%", height: "75%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
  let Msize = {maxWidth: "88%", height: "85%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
  let Lsize = {maxWidth: "100%", height: "100%", margin: "auto", border: "3px solid", borderColor: "#D64A1E", overflowY: "hidden"};
  let renderElement;
  let contentType = pileData.contentType;
  switch (contentType) {
    case "web":
    let renderType;
    let previewState = {
      "description": pileData.urlSiteInfo.description,
      "img": pileData.urlSiteInfo.img,
      "url": pileData.urlSiteInfo.url,
      "title": pileData.urlSiteInfo.title
    };
    $.each(previewState, function(previewKey, previewValue){
      if(previewValue == null){
        return;
      }else{
        renderType=previewKey;
        return false;
      }
    })
    switch (renderType) {
      case "img":
        renderElement = (<div><h4>{pileData.urlSiteInfo.title}</h4><img src={pileData.urlSiteInfo.img} style={{maxWidth: "80%", maxHeight: "100%"}}/></div>);
        break;
      case "description":
        renderElement = (<div><h4>{pileData.urlSiteInfo.title}</h4><p>{pileData.urlSiteInfo.description}</p></div>)
        break;
      case "url":
        renderElement = (<div><h4>{pileData.urlSiteInfo.title}</h4><a href={pileData.urlSiteInfo.url} target="_blank">{pileData.urlSiteInfo.url}</a></div>);
        break;
      case "title":
        renderElement = (<div><h4>{pileData.urlSiteInfo.title}</h4></div>);
        break;
      default:
        renderElement = (<DisplayEditor className='' rawContent={pileData.rawContent}/>)
    }
      break;
    case "image":
      renderElement = (<img src={pileData.urlSiteInfo.img} style={{maxWidth: "80%", height: "auto"}}/>);
      break;
    case "file-pdf":
      renderElement = (<div><div>{pileData.urlSiteInfo.fileHost}</div><embed type="application/pdf" src={pileData.urlSiteInfo.embed} style={{width: "95%", height: "auto"}}/></div>);
      break;;
    case "unclear":
      renderElement = (<h4>{pileData.urlSiteInfo.title}</h4>)
      break;
    default:
      renderElement = (<DisplayEditor className='' rawContent={pileData.rawContent}/>);
      break;
  }
  return (
    <li
      key={"Key_"+location+"_"+String(pileData.id)}
      id={"id_"+location+String(pileData.id)}
      style={{display: "inline-block", width: "23vw", height: "32vh", margin: "1vh 1vw"}}>
      <div
        style={pileData.time%4===0 ? Lsize : pileData.time%4===1 ? Msize : pileData.time%4===2 ? Ssize : XSsize}>
        {renderElement}
      </div>
    </li>
  );
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
  Issue
)
